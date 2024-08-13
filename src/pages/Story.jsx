import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    document.title = "Our Story"
  
   
  }, [])
  
  return (
    <div className="flex items-center flex-col">
      <section className="bg-white py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">About Our Company</h1>
              <p className="text-gray-700 text-lg md:text-xl">
              Purigo is a prominent food processing company based in India. We specialize in producing high-quality pickles that are cherished across the nation. Our journey began in the humble kitchen of our founder, Yash Goel, and has grown into a trusted brand delivering authentic flavors to households across multiple states.
              </p>
            </div>
            <img
              src="/logonobg.png"
              width="550"
              height="550"
              alt="About Us"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full shadow-lg"
            />
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Our History</h2>
              <p className="text-gray-700 text-lg md:text-xl">
              At Purigo, we strive to become a leading name in the food processing industry by offering superior tasting and high-quality pickles. Our mission is to see Purigo feature among the top food brands in India, delivering the taste of tradition and innovation in every jar.

              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">2015</h3>
                <p className="text-gray-700">
                Our successful journey began under the dynamic leadership of Yash Goel, who started making pickles at home, preserving age-old recipes and traditions.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">2018</h3>
                <p className="text-gray-700">
                Slowly but surely, Purigo Pickles have become household favorites with food lovers across the country.
                </p>
              </div>
              
             
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">2023</h3>
                <p className="text-gray-700">
                  Recognized as one of the fastest-growing food companies in the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Meet Our Team</h2>
              <p className="text-gray-700 text-lg md:text-xl">
                Our team is composed of talented individuals with diverse backgrounds and expertise. Together, we work
                towards a common goal of delivering exceptional solutions to our clients.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
              <div className="space-y-4">
                <img
                  src="/placeholder.svg"
                  width="300"
                  height="300"
                  alt="John Doe"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover shadow-lg"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-bold text-primary">Yash Goel</h3>
                  <p className="text-gray-700">CEO</p>
                  
                </div>
              </div>
              <div className="space-y-4">
                <img
                  src="/placeholder.svg"
                  width="300"
                  height="300"
                  alt="Jane Smith"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover shadow-lg"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-bold text-primary">Anju Goel</h3>
                  <p className="text-gray-700">CTO</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
