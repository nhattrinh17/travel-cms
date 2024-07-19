'use client';

import Table from '@/uiCore/Table';
import { updateUserCms, useUsers } from '../../../components/user/utils/handleUser';
import Pagination from '@/uiCore/Pagination';
import { useAppDispatch } from '@/lib';
import { resetDataUser, setLimitOrPageUser } from '@/lib/redux/app/users.slice';
import { useEffect, useState } from 'react';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { Status, TypeUser } from '@/constants';
import { faBuildingColumns, faCoins, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

import { FilterUser } from '@/components/user/FilterUser';
import { useRouter } from 'next/navigation';
import { HeaderContent } from '@/components/HeaderContent';

export default function PageUser(): JSX.Element {
  const dataUser = useUsers();
  const { pagination, data } = dataUser;
  const dispatch = useAppDispatch();
  const [userEdit, setUserId] = useState('');

  let dataUserEdit: ItemAddOrUpdateDto[] = [];
  if (userEdit) {
    const dataId = data.find((p: any) => p.id == userEdit);
    if (dataId) {
      dataUserEdit = [
        {
          name: 'name',
          label: 'Tên người dùng',
          type: 'text',
          value: dataId.name,
          readOnly: true,
          canUpdate: false,
        },
        {
          name: 'typeUser',
          label: 'Loại user ',
          type: 'options',
          value: dataId.typeUser,
          readOnly: false,
          canUpdate: true,
          dataOption: [
            {
              text: 'Gia sư',
              value: TypeUser.Tutor,
            },
            {
              text: 'Quản lý ứng dụng',
              value: TypeUser.Admin,
            },
          ],
        },
        {
          name: 'phone',
          label: 'Số điện thoại người dùng ',
          type: 'text',
          value: dataId.phone,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'status',
          label: 'Trạng thái người dùng',
          type: 'options',
          value: dataId.status,
          readOnly: false,
          canUpdate: true,
          dataOption: [
            {
              text: 'Hoạt động',
              value: Status.Active,
            },
            {
              text: 'Chặn',
              value: Status.Inactive,
            },
          ],
        },

        {
          name: 'password',
          label: 'Mật khẩu mới người dùng',
          type: 'text',
          value: '',
          readOnly: false,
          canUpdate: true,
          placeholder: 'Nhập mật khẩu mới(Nên nhập 8 ký tự trở lên)',
        },
      ];
    }
  }

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageUser({ page: page }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetDataUser());
    };
  }, []);

  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="User" title="Quản lý người dùng" />
      <div className="main-page min-h-full flex-1 relative">
        <FilterUser />
        {data.length ? (
          <div>
            <Table
              textColor="black"
              data={data}
              columnDelete={false}
              columnEdit
              handleDelete={(id) => {}}
              handleEdit={(id) => {
                setUserId(String(id));
              }}
            />
            <div>
              <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
            </div>
            {userEdit ? (
              <PopupEditOrAddV1
                title="Cập nhật thông tin user"
                id={+userEdit}
                data={dataUserEdit}
                onCancel={() => setUserId('')}
                onSubmit={(id, data, dispatch) => {
                  updateUserCms(id, data, dispatch);
                  setUserId('');
                }}
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
