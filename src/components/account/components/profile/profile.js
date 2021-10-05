import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { LOAD_PROFILE_DATA, UPDATE_PROFILE } from './lib';

import { Button } from '../../../basicComponents/button';
import { ValidationError, ValidationSuccess } from '../../../basicComponents/validation';

const Profile = () => {
  const [name, setName] = useState('');
  const [nameKana, setNameKana] = useState('');
  const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const { data } = useQuery(LOAD_PROFILE_DATA, {
    onCompleted: () => {
      setName((data && data.loginWithToken.data.name) || '');
      setNameKana((data && data.loginWithToken.data.nameKana) || '');
      setPhone((data && data.loginWithToken.data.phoneNumbers[0] && data.loginWithToken.data.phoneNumbers[0].number) || '');
      // setAddress((data && data.loginWithToken.data.address.primary) || '');
    }
  });

  const [updateProfile, { error, loading }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => setUpdateSuccess(true),
    onError: () => null
  });

  const onSubmit = () => {
    updateProfile({
      variables: {
        id: data && data.loginWithToken.data.id,
        name,
        nameKana,
        phone,
        // address,
      }
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">お名前</label>
      <input type="text" name="name" placeholder="例）山田花子" required 
        autoFocus 
        value={name} 
        onChange={e => setName(e.target.value)}
      />

      <label htmlFor="nameFurigana">お名前（ふりがな）</label>
      <input type="text" name="nameFurigana" placeholder="例）やまだはなこ" required 
        onChange={e => setNameKana(e.target.value)} 
        value={nameKana}
      />

      <label htmlFor="phone">電話番号</label>
      <input name="phone" type="tel" placeholder="例）080-5455-4444" required 
        onChange={e => setPhone(e.target.value)} 
        value={phone}
      />   

      {/* <label htmlFor="address">住所</label>
      <input name="address" type="text" placeholder="例）東京都渋谷区渋谷1-3-9" required 
        onChange={e => setAddress(e.target.value)} 
        value={address}
      /> */}


      { error && <ValidationError msg={error.message}/> }
      { updateSuccess && <ValidationSuccess msg="プロフィールが更新されました。"/> }

      <Button main loading={loading}>更新</Button>
    </form>
  )
}

export default Profile;