"use client";
import Script from "next/script";
import { FC } from "react";

interface HikrTrackingScriptProps {
  websiteId: string;
}

/**
 * Component to inject Meta Pixel tracking script with a dynamic Pixel ID
 */
const HikrTrackingScript: FC<HikrTrackingScriptProps> = ({
  websiteId,
}: HikrTrackingScriptProps) => {
  if (!websiteId) return null;

  return (
    <>
      <Script
        src="http://localhost:9000/script.js" 
        //E.g: https://static.staticsave.com/hikrcdn/script.js or DEployed CDN link
        strategy="lazyOnload"
        onLoad={() => {
          if (window.hikr) {
            window.hikr.config({ websiteId: websiteId, userConsent: true })
              .then(() => console.log('Configuration successful'))
              .catch((error) => console.error('Configuration failed', error));

            window.hikr.pushData({
              eventType: "click",
              collectionName: "userInteractions",
              data: "",
              userConsent: true
            });
          }
        }}
        onError={(e) => {
          console.error('Script failed to load:', e);
        }}
      />
      <noscript>
        "Unable to load tracking script."
      </noscript>
    </>
  );
};

export default HikrTrackingScript;
