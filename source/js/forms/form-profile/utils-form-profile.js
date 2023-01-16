import {deleteDataUser, URL} from '../utils-form.js';
import {changesUserData, renderLinks} from '../../common.js';

function onSuccessDelete(data) {
  changesUserData(data, '');
  location.pathname = '/';
  deleteDataUser();
  renderLinks();
}

function onSuccessFormData(data) {
  changesUserData(data);
}

export {
  onSuccessDelete,
  onSuccessFormData,
};
