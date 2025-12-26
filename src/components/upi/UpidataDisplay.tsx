import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

const UpidataDisplay = ({ data }: { data: any }) => {
    const newData = data && data;

    return (
        <>
            {(!!newData && newData.owners?.length > 0) ? (
                <>
                    <h1 className="mt-6 mb-5 text-xl font-bold">UPI Data Overview</h1>
                    <div className="grid max-w-full p-6 mx-auto space-x-4 space-y-6 bg-white rounded-lg shadow-lg lg:grid-cols-2 sm:grid-cols-1">
                        <div className="p-4 mb-6 shadow-sm rounded-2xl">
                            <h2 className="text-xl font-semibold">Land Information</h2>
                            <p><strong>UPI:</strong> {newData.upi}</p>
                            <p><strong>Size: </strong>
                                <span className="ml-1 font-semibold text-orange-400">
                                    {newData.size} sq. m
                                </span>
                            </p>
                            <p><strong>Land Use (English):</strong>
                                <span className="ml-1 font-semibold text-orange-400">
                                    {newData.landUseNameEnglish}
                                </span>
                            </p>
                            <p><strong>Land Use (Kinyarwanda):</strong>
                                <span className="ml-1 font-semibold text-orange-400">
                                    {newData.landUseNameKinyarwanda}
                                </span>
                            </p>
                            <p><strong>Right Type:</strong> {newData.rightType}</p>
                            <p><strong>Remaining Lease Term:</strong> {newData.remainingLeaseTerm} years</p>
                            <p><strong>In Process:</strong> {newData.inProcess ? "Yes" : "No"}</p>
                            <p><strong>Is Under Mortgage:</strong> {newData.isUnderMortgage ? "Yes" : "No"}</p>
                            <p><strong>Is Under Restriction:</strong> {newData.isUnderRestriction ? "Yes" : "No"}</p>
                            {/* <p><strong>Coordinates Reference System:</strong> {newData.coordinateReferenceSystem}</p> */}
                        </div>

                        <div className="p-4 bg-gray-100 shadow-md rounded-2xl">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-orange-400">Owners</h2>
                                {newData.owners && newData.owners?.map((owner: any, index: any) => (
                                    <div key={index} className="py-2 border-b">
                                        <p><strong>Name:</strong> {owner?.fullName}</p>
                                        <p><strong>ID No:</strong> {owner?.idNo}</p>
                                        <p><strong>Country:</strong> {owner?.countryName}</p>
                                        <p><strong>Gender:</strong> {owner?.gender}</p>
                                        <p><strong>Marital Status:</strong>
                                            <span className="text-orange-400"> {owner?.maritalStatus ?? '-'}</span>
                                        </p>
                                        <p><strong>Share Percentage:</strong>
                                            <span className="text-orange-400"> {owner?.sharePercentage ?? '-'}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 mb-6 shadow-sm rounded-2xl">
                            <h2 className="text-xl font-semibold">Representative Information</h2>
                            <p><strong>Name:</strong> {`${data?.representative?.surname} ${data?.representative?.foreNames}`}</p>
                            <p><strong>ID No:</strong> {newData.representative?.idNo}</p>
                            <p><strong>Country:</strong> {newData.representative?.countryName}</p>
                            <p><strong>Gender:</strong> {newData.representative?.gender}</p>
                            <p><strong>Marital Status:</strong> {newData.representative?.maritalStatus}</p>
                            <p><strong>Current address: </strong>
                                {` ${newData.representative?.address.village.villageName}, ${newData.representative?.address.cell.cellName}, ${newData.representative.address.sector.sectorName}, ${newData.representative.address.district.districtName}, ${newData.representative.address.province.provinceName}`}
                            </p>
                        </div>

                        <div>

                            <div className="p-6 mb-6 shadow-md bg-orange-50 rounded-2xl">
                                <h2 className="text-xl font-semibold">Parcel Location</h2>
                                <p><strong>Village:</strong> {newData.parcelLocation?.village.villageName}</p>
                                <p><strong>Cell:</strong> {newData.parcelLocation?.cell.cellName}</p>
                                <p><strong>Sector:</strong> {newData.parcelLocation?.sector.sectorName}</p>
                                <p><strong>District:</strong> {newData.parcelLocation?.district.districtName}</p>
                                <p><strong>Province:</strong> {newData.parcelLocation?.province.provinceName}</p>
                            </div>
                        </div>

                        <div className="p-6 mb-6 bg-gray-100 shadow-md rounded-2xl">
                            <h2 className="text-xl font-semibold text-orange-400">Planned Land Uses</h2>
                            {data && newData.plannedLandUses?.map((planned: any, index: any) => (
                                <div key={index} className="py-2 border-b">
                                    <p className="text-gray-700">
                                        <strong>Land Use Name:</strong> <span className="font-semibold text-orange-400">{planned?.landUseName}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Area:</strong> <span className="font-semibold text-orange-400">{planned?.area}sq. m</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 mb-6 shadow-sm rounded-2xl">
                            <h2 className="text-xl font-semibold">Valuation Value</h2>
                            <p><strong>Minimum Price:</strong> {newData.valuationValue?.minPrice} RWF</p>
                            <p><strong>Maximum Price:</strong> {newData.valuationValue?.maxProce} RWF</p>
                        </div>
                    </div>

                    {!!newData?.coordinates && (
                        <div className='p-6 mt-6 bg-white rounded-lg shadow-lg'>
                            <h1 className="mb-2 text-xl font-extrabold">View on map</h1>
                            <MapComponent coordinates={newData?.coordinates} />
                        </div>
                    )}
                </>
            ) : <p className="text-red-500">No UPI data available. Check well the UPI</p>
            }
        </>
    );
};

export default UpidataDisplay;
