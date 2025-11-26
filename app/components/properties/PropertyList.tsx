import React from 'react'

const PropertyList = ({properties}:any) => {
  return (
     <table className="w-full text-left mt-3">
                  <thead>
                    <tr className="text-[#404059] text-[16px] font-workSans border-b border-gray-300">
                      <th className="py-3 font-medium">Property Name</th>
                      <th className="font-medium">Address</th>
                      <th className="font-medium">No. beds</th>
                      <th className="font-medium">No. baths</th>
                      <th className="font-medium">Dimension</th>
                      <th className="font-medium">Marketing</th>
                      <th className="font-medium">Compliance</th>
                    </tr>
                  </thead>

                  <tbody>
                    {properties.map((property:any) => (
                      <tr
                        key={property.id}
                        className="text-[16px] text-[#151B38] font-medium font-workSans border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4">{property.title}</td>
                        <td>{property.city || "N/A"}</td>
                        <td>{property.bedrooms || 0}</td>
                        <td>{property.bathrooms || 0}</td>
                        <td>
                          {property.dimension
                            ? `${property.dimension} m²`
                            : "N/A"}
                        </td>
                        <td>
                          <span className="bg-[#E1F7EF] text-[14px] px-8 py-2 rounded-md">
                            20%
                          </span>
                        </td>
                        <td>
                          <span className="bg-[#E1F7EF] text-[14px] px-8 py-2 rounded-md">
                            20%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
  )
}

export default PropertyList