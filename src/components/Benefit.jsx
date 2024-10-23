import { HeartOutlined, ShopFilled, ShoppingFilled, TrophyFilled } from '@ant-design/icons';
import React from 'react';

const Benefits = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center py-20 bg-[#f5f1ea] space-y-8 md:space-y-0">
      <div className="flex items-center space-x-4">
        <TrophyFilled className='text-3xl text-teal-500'/>
        <div>
          <h4 className="font-semibold text-lg text-teal-500">High Quality</h4>
          <p className="text-sm text-teal-500">crafted from top materials</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ShopFilled className="text-3xl text-teal-500"/>
        <div>
          <h4 className="font-semibold text-lg text-teal-500">Warranty Protection</h4>
          <p className="text-sm  text-teal-500">Over 2 years</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ShoppingFilled className="text-3xl text-teal-500"/>
        <div>
          <h4 className="font-semibold text-lg  text-teal-500">Free Shipping</h4>
          <p className="text-sm  text-teal-500">Order over 150 $</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <HeartOutlined className="text-3xl  text-teal-500"/>
        <div>
          <h4 className="font-semibold text-lg  text-teal-500">24 / 7 Support</h4>
          <p className="text-sm  text-teal-500">Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;