import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch } from '@/lib';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';

const cx = classNames.bind(styles);

export interface ItemAddOrUpdateDto {
  name: string;
  label: string;
  type: string;
  value: string | number;
  readOnly: boolean;
  required?: boolean;
  placeholder?: string;
  dataOption?: {
    text?: string;
    value?: string | number;
  }[];
  canUpdate?: boolean;
}

export interface DataEditDto {
  data: ItemAddOrUpdateDto[];
  onCancel: () => void;
  maxWidth?: number | string;
  minWidth?: number | string;
  id?: number;
  title?: string;
  textWarning?: string;
  onSubmit?: (id: number, data: any, dispatch: any) => void;
  onSubmitCreate?: (data: any, dispatch: any) => void;
  handleUploadOneFile?: (file: File) => Promise<string[]>;
  position?: any;
}

export function PopupEditOrAddV1({
  //
  id,
  data,
  minWidth,
  maxWidth,
  onCancel,
  onSubmit,
  title,
  textWarning,
  handleUploadOneFile,
  onSubmitCreate,
  position = 'absolute',
}: DataEditDto) {
  const [dataState, setDataState] = useState(data);
  const isUnableBtn = dataState.some((item) => item.canUpdate);
  const editorRef = useRef<any>();

  const dispatch = useAppDispatch();

  const handleOnChangeInputOrSelect = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, col: ItemAddOrUpdateDto) => {
    //   const element = e.target as HTMLOptionElement;
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          return {
            ...item,
            value: e.target.value,
          };
        } else {
          return item;
        }
      });
      return dataNew;
    });
  };

  const handleChangeFile = (urlImage: string, col: ItemAddOrUpdateDto) => {
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          return {
            ...item,
            value: urlImage,
          };
        } else {
          return item;
        }
      });
      return dataNew;
    });
  };

  // Editor
  const handleUploadImg = async (blobInfo: any, progress: any): Promise<string> => {
    const uploadImg: string[] = handleUploadOneFile ? await handleUploadOneFile(blobInfo.blob()) : [];
    return uploadImg[0];
  };

  return (
    <div
      onClick={onCancel}
      className={cx('wrapper')}
      style={{
        position: position || 'absolute',
      }}>
      <form
        className={cx('wrapper__form', 'shadow-sm')}
        style={{
          minWidth: minWidth || 400,
          maxWidth: maxWidth || 'auto',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const dataSend: any = {};
          dataState.forEach((item, index) => {
            if (item.canUpdate) {
              if (item.type !== 'editor') dataSend[item.name] = item.value;
              else dataSend[item.name] = editorRef.current[item.name].getContent();
            }
          });
          if (id) {
            onSubmit && onSubmit(id, dataSend, dispatch);
          } else {
            onSubmitCreate && onSubmitCreate(dataSend, dispatch);
          }
          onCancel();
        }}>
        <div className={cx('group__list')} onClick={(e) => e.stopPropagation()}>
          <div className={cx('body__header')}>
            <h1 className={cx('body__header--text', 'flex-1 ')}>{title || 'Cập nhật quá trình giao dịch'}</h1>
            <FontAwesomeIcon className={cx('body__header--icon')} icon={faXmark} onClick={onCancel} />
          </div>
          {textWarning && <p className={cx('wrapper__warning', 'text-center text-red-500 mb-1 text-sm')}>{textWarning}</p>}
          {dataState.map((col, index) => (
            <div key={index} className={cx('group__data')}>
              <label className={cx('group__data--label')}>{col.label}</label>
              {col.type == 'options' ? (
                <select
                  required={col.required}
                  className={cx('group__data--select', { 'group__data--input-readOnly': col.readOnly })}
                  name={col.name}
                  defaultValue={col.value}
                  onChange={(e) => {
                    handleOnChangeInputOrSelect(e, col);
                  }}>
                  {col.dataOption?.map((val, index) => (
                    <option key={index} className={cx('group__data--option')} value={val.value}>
                      {val.text}
                    </option>
                  ))}
                </select>
              ) : col.type == 'images' || col.type == 'image' ? (
                <div className="">
                  <input
                    type="file"
                    name={col.name}
                    required={col.required}
                    multiple
                    onChange={async (e) => {
                      if (e.target.files && handleUploadOneFile) {
                        const urlImage = await handleUploadOneFile(e.target.files[0]);
                        if (urlImage.length) {
                          handleChangeFile(urlImage[0], col);
                        }
                      }
                    }}
                  />
                  <div className="mt-4">
                    <Image alt="Image demo" src={String(col.value) || '/no-image.jpg'} width={80} height={80} className={cx('image__demo', 'rounded-2xl')} />
                  </div>
                </div>
              ) : col.type == 'editor' ? (
                <Editor
                  apiKey="luqq3j7fb1fwxw205pen9j2yi2uw2mldo3lwmkb6j4r8w0yt"
                  init={{
                    plugins: ['a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' + 'alignleft aligncenter alignright alignjustify | ' + 'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',

                    automatic_uploads: true,
                    images_upload_handler: handleUploadImg,

                    menubar: true,
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    // mergetags_list: [
                    //   { value: 'First.Name', title: 'First Name' },
                    //   { value: 'Email', title: 'Email' },
                    // ],
                    ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                  }}
                  onInit={(_evt, editor) => {
                    editorRef.current = {
                      ...editorRef.current,
                      [col.name]: editor,
                    };
                  }}
                  initialValue={String(col.value)}
                />
              ) : (
                <input
                  value={col.value ?? ''}
                  name={col.name}
                  type={col.type}
                  required={col.required}
                  readOnly={col.readOnly}
                  placeholder={col.placeholder}
                  className={cx('group__data--input', { 'group__data--input-readOnly': col.readOnly })}
                  onChange={(e) => {
                    handleOnChangeInputOrSelect(e, col);
                  }}
                />
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isUnableBtn}
              className={cx('submit-btn', 'rounded-xl disabled:cursor-not-allowed disabled:bg-zinc-500')}
              onSubmit={(e) => {
                // e.preventDefault();
              }}>
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
