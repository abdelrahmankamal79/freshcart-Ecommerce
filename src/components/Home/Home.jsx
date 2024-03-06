
import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'



export default function Home() {
  return <>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
  <MainSlider/>
  <CategoriesSlider/>
  <FeatureProducts/>
  </>
}
