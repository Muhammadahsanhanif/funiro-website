import {
  HeartOutlined,
  LikeOutlined,
  ShareAltOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

 
 
 const furnitureProducts = [
  {
    id: 1,
    name: "Syltherine",
    category: "Chair",
    price: "$16.00",
    img: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 2,
    name: "Leviosa",
    category: "Chair",
    price: "$21.15",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVhbnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    name: "Syltherine",
    category: "Chair",
    price: "$16.00",
    img: "https://images.unsplash.com/photo-1499713907394-43c9d094ac2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    name: "Leviosa",
    category: "Chair",
    price: "$21.15",
    img: "https://images.unsplash.com/photo-1521330784804-5f69f8a17b1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
  },
  // Add the rest of your products here, following the same format.
];

function Cards() {
  return (
    <section className="text-teal-500 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {furnitureProducts.map((product) => (
            <div
              key={product.id}
              className="lg:w-1/4 md:w-1/2 p-4 w-full group"
            >
              <div className="block relative h-60 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={product.img}
                />
                <div className="absolute inset-0 text-teal-500 bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center">
                    <button
                      style={{ color: "#38B2A0" }}
                      className="bg-white px-4 py-2 font-bold mb-2"
                    >
                      Add to cart
                    </button>
                    <div className="flex" style={{ color: "#38B2A0" }}>
                      <ShareAltOutlined style={{ marginRight: 10 }} />
                      <span style={{ marginRight: 10 }}>Share</span>
                      <SwapOutlined style={{ marginRight: 10 }} />
                      <span style={{ marginRight: 10 }}>compare</span>
                      <HeartOutlined style={{ marginRight: 10 }} />
                      <span style={{ marginRight: 10 }}>Like</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-teal-500 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-teal-500 title-font text-lg font-medium">
                  {product.name}
                </h2>
                <p className="mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to={"/Shop"}>
            <button
              style={{ borderColor: "teal-500", color: "teal-500" }}
              className="m-auto mt-9 bg-white px-6 py-2 border w-60 font-bold"
            >
              Show More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cards;
