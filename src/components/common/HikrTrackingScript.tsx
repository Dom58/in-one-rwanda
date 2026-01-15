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
        src="http://localhost:9000/script.js" //replace with the actual path to the CDN script where deployed
        //E.g: http://localhost:9000/script.js or /script.js from your public folder
        strategy="lazyOnload"
        onLoad={() => {
          window.hikr.createUser(websiteId)
          window.hikr.config({ websiteId: websiteId, userConsent: true })
            .then(() => console.log('Configuration successful'))
            .catch((error) => console.error('Configuration failed', error));
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
