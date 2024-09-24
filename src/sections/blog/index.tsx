'use client';

import { BlogCategoriesComponent } from '@/components/blog/Categories';
import { HeaderContent } from '@/components/HeaderContent';
import { useAppDispatch } from '@/lib';
import { setLimitOrPageBlog } from '@/lib/redux/app/blog.slice';
import { upLoadFiles } from '@/share/upLoadFile';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { handleCreateBlog, handleDeleteBlog, handleUpdateBlog, useBlog } from '@/utils/handleBlog';
import { useBlogCategories } from '@/utils/handleBlogCategory';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function ManageBlogSections(): JSX.Element {
  const [showCategory, setShowCategory] = useState(false);
  const { data: dataBlogCategories } = useBlogCategories(100);
  const [idEdit, setIdEdit] = useState<number>();
  const dispatch = useAppDispatch();
  const [idBlogCategory, setIdBlogCategory] = useState(0);
  const { data: dataBlog, pagination } = useBlog(idBlogCategory);
  const blogById = dataBlog.find((i) => i.id == idEdit);
  const [openBoxCreate, setOpenBoxCreate] = useState(false);

  const setPageBlog = (page: number) => {
    dispatch(
      setLimitOrPageBlog({
        page: page,
      }),
    );
  };

  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Blog Category',
      name: 'blogCategoryId',
      readOnly: !!blogById,
      type: 'options',
      required: true,
      value: blogById?.blogCategoryId || dataBlogCategories[0]?.id,
      canUpdate: !blogById,
      dataOption: [
        ...dataBlogCategories.map((i) => {
          return {
            text: i.name,
            value: i.id,
          };
        }),
      ],
    },
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: blogById?.name || '',
      canUpdate: true,
      required: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Content brief(show when introduced)',
      name: 'description',
      type: 'textarea',
      readOnly: false,
      required: true,
      value: blogById?.description || '',
      canUpdate: true,
      placeholder: 'Enter ...',
    },
    {
      label: 'Content',
      name: 'content',
      type: 'editor',
      readOnly: false,
      required: true,
      value: blogById?.content || 'Enter content...',
      canUpdate: true,
      placeholder: 'Enter ...',
    },
    {
      label: 'Image',
      name: 'image',
      type: 'image',
      readOnly: false,
      value: blogById?.image || '',
      canUpdate: true,
    },
  ];

  return (
    <main className="relative min-h-full">
      <HeaderContent path="blog" title="Manage Blog" />
      <div className="p-3 ">
        <div className="">
          <h2 className="font-medium text-base">Manage Config blog</h2>
          <div className="mt-2">
            <button onClick={() => setShowCategory(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
              List of Categories
            </button>
            {showCategory ? <BlogCategoriesComponent onCancel={() => setShowCategory(false)} /> : <></>}
          </div>

          <div className="my-3">
            <h3 className="font-medium text-base">Filter Blog</h3>
            {/* <p className="text-red-500 mt-1">
            Please selected <span className="underline">Destination</span> and <span className="underline">Detail Destination</span> before add cruise
          </p> */}
            <div className="flex items-center mt-2">
              <select defaultValue={idBlogCategory} onChange={(e) => setIdBlogCategory(+e.target.value)} className="mr-5 outline-none border-[1px] rounded-2xl py-2 px-3">
                <option>--Select Blog Category--</option>
                {dataBlogCategories.map((d, index) => (
                  <option value={d.id} key={index}>
                    {d.name}
                  </option>
                ))}
              </select>

              <div className="py-2 px-3 border-[1px] bg-white border-[#ccc] rounded-2xl w-fit cursor-pointer transition-all" onClick={() => setOpenBoxCreate(true)}>
                <span className="mr-1 text-base">Add Blog</span>
                <FontAwesomeIcon className="text-xs" icon={faPlus} />
              </div>
            </div>
          </div>

          <div className="min-h-full flex-1">
            <Table
              //
              columnDelete
              columnEdit
              data={dataBlog}
              columnNotShow={['slug', 'content']}
              handleEdit={(id) => setIdEdit(id)}
              handleDelete={(id) => {
                handleDeleteBlog(id, dispatch);
              }}
            />
            <Pagination count={pagination.total} limit={pagination.limit} page={pagination.page} setPage={setPageBlog} />
          </div>

          {(idEdit || openBoxCreate) && (
            <PopupEditOrAddV1
              title={openBoxCreate ? 'Add Blog' : 'Update Blog'}
              data={dataDto}
              onCancel={() => {
                setIdEdit(0);
                setOpenBoxCreate(false);
              }}
              id={idEdit}
              onSubmitCreate={handleCreateBlog}
              onSubmit={handleUpdateBlog}
              position={'fixed'}
              maxWidth={'90%'}
              handleUpLoadFiles={(file) => upLoadFiles('image', file)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
