// components/PostSwiper.js (FINAL, FULL, CORRECTED CODE)
"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

export default function PostSwiper({ randomPosts }) {
  const getPostId = (url) => {
    if (!url) return '';
    return url.split('/').pop().replace('.html', '');
  };

  const getFirstImage = (content) => {
    if (!content) return 'https://via.placeholder.com/1280x720.png?text=iPopcorn';
    const match = content.match(/<img.*?src="(.*?)"/);
    return match ? match[1] : 'https://via.placeholder.com/1280x720.png?text=iPopcorn';
  };

  return (
    <div className="mb-8 rounded-lg overflow-hidden shadow-lg relative swiper-custom-container">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {(randomPosts || []).map((post) => (
          <SwiperSlide key={post.guid || post.link}>
            <Link to={`/post/${getPostId(post.link)}`} className="block group relative w-full aspect-video bg-white">
                <img 
                    src={getFirstImage(post.content || post.description)} 
                    alt={post.title}
                    className="absolute top-0 left-0 w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white w-full">
                    <h2 className="text-xl md:text-2xl font-bold line-clamp-2 group-hover:text-blue-300 transition-colors">{post.title}</h2>
                </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}