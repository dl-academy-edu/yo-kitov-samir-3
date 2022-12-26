import {createBlog} from './utilsBlog.js';

document.body.append(createBlog('#blog', {
  date: '2020-09-17T11:37:42.206Z',
  title: 'Why don\'t the monkeys talk.',
  tags: [{id: 1, color: '#F79824'}, {id: 7, color: '#6A7FDB'}],
  views: 428,
  commentsCount: 27,
  text: 'Human apes are the animals closest to us. They have a brain volume close to human, and their behavior is much like human.',
  id: 9,
  photo: {
    desktopPhotoUrl: 'img/post/post-image.jpg',
    desktop2xPhotoUrl: 'img/post/post-image@x2.jpg',
    tabletPhotoUrl: 'img/post/post-image-tablet.jpg',
    tablet2xPhotoUrl: 'img/post/post-image-tablet@x2.jpg',
    mobilePhotoUrl: 'img/post/post-image-mobile.jpg',
    mobile2xPhotoUrl: 'img/post/post-image-mobile@x2.jpg'
  },
}));
