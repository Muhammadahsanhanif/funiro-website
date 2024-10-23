import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <motion.h1
                className="text-4xl font-bold text-teal-500 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                About Us
            </motion.h1>
            <motion.p
                className="text-lg text-gray-700 max-w-2xl text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                We are a team of dedicated professionals committed to providing the best services to our customers. Our mission is to deliver high-quality products and create lasting relationships with our clients. 
            </motion.p>
            <motion.p
                className="text-lg text-gray-700 max-w-2xl text-center mt-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                With years of experience in the industry, we understand the needs of our clients and strive to exceed their expectations at every turn. Thank you for choosing us!
            </motion.p>
        </div>
    );
};

export default About;
