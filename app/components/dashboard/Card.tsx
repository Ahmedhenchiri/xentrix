import React from 'react';


export default function Card({ title, linkText, children }: { title: string; linkText?: string; children: React.ReactNode; }) {
return (
<div className="bg-white rounded-xl shadow p-6">
<div className="flex items-center justify-between mb-4 border-b border-gray-400 pb-3">
<h3 className="font-bold text-[18px] font-workSans text-[#151B38]">{title}</h3>
{linkText && <a className="text-[16px] font-semibold font-workSans text-[rgba(39,196,153,1)] underline">{linkText}</a>}
</div>


<div>{children}</div>

</div>
);
}