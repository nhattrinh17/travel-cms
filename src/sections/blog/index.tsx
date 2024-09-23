'use client';

import { BlogCategoriesComponent } from '@/components/blog/Categories';
import { HeaderContent } from '@/components/HeaderContent';
import { useState } from 'react';

export function ManageBlogSections(): JSX.Element {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <main className="relative min-h-full">
      <HeaderContent path="blog" title="Manage Blog" />
      <div className="p-3 ">
        <div className="">
          <h2 className="font-medium text-base">Manage Config Cruise</h2>
          <div className="mt-2">
            <button onClick={() => setShowCategory(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
              List of Categories
            </button>
            {showCategory ? <BlogCategoriesComponent onCancel={() => setShowCategory(false)} /> : <></>}
          </div>

          <div className="my-3">
            <h3 className="font-medium text-base">Filter Blog</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
