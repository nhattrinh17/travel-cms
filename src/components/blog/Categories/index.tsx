'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from '@/uiCore/Table';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { handleCreateBlogCategories, handleUpdateBlogCategory, useBlogCategories } from '@/utils/handleBlogCategory';

import { useAppDispatch } from '@/lib';
import { resetDataBlogCategories } from '@/lib/redux/app/blogCategories.slice';
import { upLoadFiles } from '@/share/upLoadFile';

const cx = classNames.bind(styles);

export function BlogCategoriesComponent({ onCancel }: { onCancel: () => void }): JSX.Element {
  const [isCreate, setIsCreate] = useState(false);
  const { data } = useBlogCategories();
  const [idEdit, setIdEdit] = useState<number>();
  const dispatch = useAppDispatch();

  const blogCategoryById = data.find((i) => i.id == idEdit);
  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: blogCategoryById?.name || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Description',
      name: 'description',
      type: 'textarea',
      readOnly: false,
      value: blogCategoryById?.description || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Image ',
      name: 'image',
      type: 'image',
      readOnly: false,
      value: blogCategoryById?.image || '',
      canUpdate: true,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(resetDataBlogCategories());
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div>
        <div className="flex justify-between">
          <h2 className="font-medium">Manage Blog Categories</h2>
          <FontAwesomeIcon className="text-xl cursor-pointer" icon={faXmark} onClick={onCancel} />
        </div>
        <p className="text-sm underline">Click update to see BlogCategories description</p>
        <div className="mt-2 px-3 py-[6px] border-[1px] rounded-2xl w-fit cursor-pointer hover:bg-[#a27cff63] transition-all" onClick={() => setIsCreate(true)}>
          <span className="mr-1 text-base">Add Blog Categories</span>
          <FontAwesomeIcon className="text-xs" icon={faPlus} onClick={() => {}} />
        </div>

        <div className={cx('min-h-full flex-1')}>
          <Table
            columnNotShow={['slug', 'description']}
            textColor="black"
            data={data}
            columnDelete={false}
            columnEdit={true}
            // handleDelete={(id) => {
            //   handleDeleteBankPayment(idPayment, id, dispatch);
            // }}
            handleEdit={(id) => {
              setIdEdit(id);
            }}
          />
        </div>

        {(idEdit || isCreate) && (
          <PopupEditOrAddV1
            title={isCreate ? 'Add Blog Categories' : 'Update Blog Categories'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={handleCreateBlogCategories}
            onSubmit={handleUpdateBlogCategory}
            position={'fixed'}
            maxWidth={'60%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file)}
          />
        )}
      </div>
    </div>
  );
}
