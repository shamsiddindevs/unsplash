import React from 'react'

const About = () => {
  return (
    <div className='align-center py-5'  >
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center ">
      
        {/* Image Section */}
        <img
          src="https://via.placeholder.com/400"
          alt="Sample Image"
          className="max-w-sm w-full  rounded-lg shadow-2xl"
        />
        {/* Text Section */}
        <div className="md:ml-4 max-w-lg">
          <h1 className="text-2xl md:text-4xl font-bold">About Us</h1>
          <p className="py-6">
            We are committed to delivering high-quality services and solutions that meet the
            needs of our customers. Our mission is to provide excellent and innovative services
            that contribute to the growth and success of our clients.
          </p>
          <button className="btn btn-secondary">Learn More</button>
       
      </div>
    </div>
    </div>
  )
}

export default About