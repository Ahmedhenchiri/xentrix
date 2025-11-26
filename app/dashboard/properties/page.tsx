"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/properties/PropertyCard";
import Link from "next/link";
import { RiAddBoxLine } from "react-icons/ri";
import { IoGrid } from "react-icons/io5";
import { PiListBold } from "react-icons/pi";
import PropertyDetails from "@/app/components/properties/PropertyDetails";
import PropertyList from "@/app/components/properties/PropertyList";
import { Property } from "@/types";


const Page = () => {
  const [isListView, setIsListView] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertie, setPropertie] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<boolean>(false);
  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/properties");

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Format property data for PropertyCard component
  const formatPropertyForCard = (property: Property) => ({
    propertyName: property.title,
    address: property.address || "",
    city: property.city || "",
    country: property.country || "",
    postCode: property.postCode || "",
    propertyReference: property.propertyReference || "",
    propertyType: property.propertyType || "",
    propertyValue: property.propertyValue || 0,
    accessProperty: property.accessProperty || "",
    sale: property.listingType === "Sale",
    let: property.listingType === "Let",
    beds: property.bedrooms || 0,
    baths: property.bathrooms || 0,
    floors: property.floors || 0,
    dimension: property.dimension || 0,
    parking: property.parking,
    garden: property.garden,
    garage: property.garage,
    marketing: 20,
    compliance: 20,
    image: property.imageUrl || "/images/cardImage.jpg", // Fallback image
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[24px] font-bold font-workSans text-[rgba(21,27,56,1)]">
          My Properties
        </h2>
        <p className="font-workSans text-[16px] text-[#404059] font-medium pb-7">
          Easily manage and track all your properties in one place.
        </p>

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
          <div>
            <h2 className="text-[18px] font-workSans pb-2 font-bold text-[#151B38]">
              New property
            </h2>
            <p className="text-[14px] font-workSans font-medium text-[#404059]">
              You can add your property listings
            </p>
          </div>

          <Link
            href="/dashboard/properties/new"
            className="px-9 mr-3 py-3 bg-white border border-2 font-workSans text-[#151B38] font-bold rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RiAddBoxLine className="inline w-5 h-5 mr-2" /> Add New Property
          </Link>
        </div>
        {!selectedProperty ? (
          <div className="bg-white p-6 rounded-xl mt-4 shadow-sm">
            {/* PROPERTIES LISTING */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[18px] font-workSans pb-2 font-bold text-[#151B38]">
                Properties listing
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsListView(false)}
                  className={`flex items-center gap-2 text-[14px] px-3 py-2 rounded-lg ${
                    !isListView
                      ? "bg-[#151B38] text-white"
                      : "bg-[#ECF1F4] text-[#151B38]"
                  }`}
                >
                  <IoGrid /> Cards
                </button>

                <button
                  onClick={() => setIsListView(true)}
                  className={`flex items-center gap-2 text-[14px] px-3 py-2 rounded-lg ${
                    isListView
                      ? "bg-[#151B38] text-white"
                      : "bg-[#ECF1F4] text-[#151B38]"
                  }`}
                >
                  <PiListBold className="w-5 h-5" /> List
                </button>
              </div>
            </div>

            {/* EMPTY STATE */}
            {properties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <h3 className="text-[18px] font-workSans font-semibold text-[#151B38] mb-2">
                  No properties yet
                </h3>
                <p className="text-[14px] font-workSans text-[#404059] mb-6">
                  Get started by adding your first property
                </p>
                <Link
                  href="/dashboard/properties/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#151B38] text-white font-workSans font-semibold rounded-lg hover:bg-[#0f142a] transition-colors"
                >
                  <RiAddBoxLine className="w-5 h-5" /> Add Your First Property
                </Link>
              </div>
            )}

            {/* GRID VIEW */}
            {!isListView && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => {
                      setSelectedProperty(!selectedProperty);
                      setPropertie(property);
                    }}
                  >
                    <PropertyCard
                      key={property.id}
                      property={formatPropertyForCard(property)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* LIST VIEW */}
            {isListView && properties.length > 0 && (
              <div className="overflow-x-auto">
                <PropertyList properties={properties} />
              </div>
            )}
          </div>
        ) : (
          <PropertyDetails propertie={propertie} />
        )}
      </div>
    </div>
  );
};

export default Page;
