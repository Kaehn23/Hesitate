
import Hero from './components/Hero'
import React from 'react'

export const dynamicParams = false
export function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'fr' }]
}

function page() {
	return (
	   <>
	   
		  <Hero />
	   </>
	);
 }
 
 export default page;