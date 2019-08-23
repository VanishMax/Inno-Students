import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Form from './form';

const EditUser = ({ lang, user, goFromEdit }) => {
  const [form, changeForm] = useState({
    username: user.username || '',
    website: user.website || '',
    enName: user.en.name || '',
    enSurname: user.en.surname || '',
    ruName: user.ru.name || '',
    ruSurname: user.ru.surname || '',
    img: user.img || '',
    src: '',
  });

  const ref = useRef(null);

  const changeVal = (e) => {
    changeForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeImage = async (e) => {
    if (window.FileReader) {
      const file = e.target.files[0]; const
        reader = new FileReader();

      reader.onload = (r) => {
        changeForm({ ...form, src: r.target.result });
      };
      await reader.readAsDataURL(file);

      const ext = file.name.split('.').pop().toLowerCase();
      const filename = `avatars/${user.username}.${ext}`;
      changeForm({ ...form, img: filename });

      ref.current.submit();

      await fetch('/user/edit/img', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: user._id, img: filename }),
      });
    } else {
      alert('Soryy, your browser doesn\'t support the preview');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    await fetch('/user/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, _id: user._id }),
    })
      .then(res => res.json());
    goFromEdit();
  };

  return (
    <React.Fragment>
      <Form
        form={form}
        lang={lang}
        change={changeVal}
        submit={submit}
        changeImage={changeImage}
        refToForm={ref}
      />
    </React.Fragment>
  );
};

// lang, user, goFromEdit
EditUser.propTypes = {
  lang: PropTypes.string.isRequired,
  goFromEdit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.number,
    username: PropTypes.string,
    website: PropTypes.string,
    img: PropTypes.string,
    en: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
    }),
    ru: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
    }),
  }),
};

EditUser.defaultProps = {
  user: {},
};

export default EditUser;
