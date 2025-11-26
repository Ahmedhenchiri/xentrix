import Image from "next/image";
import ProgressCard from "../dashboard/ProgressCard";

const PropertyDetails = ({ propertie }: any) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-4">
      <div className="flex flex-row gap-6">
        <Image
          src={propertie.imageUrl}
          alt={propertie.propertyName || "Property Image"}
          width={600}
          height={400}
          className="w-[400px] h-[220px] object-cover rounded-lg"
        />

        <div className="flex flex-col">
          <h3 className="text-[24px] font-workSans font-semibold text-[#151B38]">
            {propertie.title}
          </h3>

          <p className="text-[18px] font-workSans font-medium text-[#404059] mt-2">
            {propertie.address}
          </p>

          <h3 className="text-[18px] font-workSans font-medium text-[#404059] mt-2">
            Ref: {propertie.propertyReference}
          </h3>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-[18px] font-workSans pb-2 font-bold text-[#151B38]">
          Property Details
        </h2>

        <div className="grid grid-cols-3 gap-6 mt-4 ">
          <div className="space-y-2">
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              Property Type :
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.propertyType}
              </span>
            </p>
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              No. of bedrooms:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.bedrooms}
              </span>
            </p>
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              Dimension:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.dimension}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              Property value:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.propertyValue}
              </span>
            </p>
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              No. of bathrooms:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.bathrooms}
              </span>
            </p>
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              Rest of:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.garden}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              Property on:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.listingType}
              </span>
            </p>
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              No. of floors:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.floors}
              </span>
            </p>
            <p className="text-[16px] font-workSans font-semibold text-[#151B38]">
              Access through:
              <span className="font-workSans font-medium text-[#404059]">
                {propertie.city}
              </span>
            </p>
          </div>
        </div>
        <p className="border mt-10 border-gray-300" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sahdow-md">
          <ProgressCard title="Marketing" percent={20} />
          <ProgressCard title="Compliance" percent={20} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
