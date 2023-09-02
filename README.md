TOKEN CHECK

/check-token                 (get) => token to'g'rimi yo'qmi tekshirish.

USERS

/users                       (post) => user register.
/users/login                 (post) => user login.
/users/reset-password        (post) => user passwordini email orqali o'zgartiradi.
/users/verify-email/:hashUrl (get) => user o'zini email orqali tasdiqlash page.
/users/my-profile            (get) => o'zini ma'lumotlari keladi.
/users/my-profile/info       (put) => o'zini ma'lumotini passworddan tashqarisini o'zgartiradi.
/users/my-profile/security   (put) => o'zini ma'lumotini passwordini o'zgartiradi.

ADMIN

/admin/login                  (post) => admin email, password bilan login.
/admin/add-category           (post) => category qo'shish.
/admin/edit-category/:id      (put) => category o'zgartirish.
/admin/delete-category/:id    (delete) => category o'chirish.
/admin/delete-seller-post/:id (delete) => seller post o'chirish.
/admin/delete-buyer-post/:id  (delete) => buyer post o'chirish.ADMIN

SELLER POST

/seller-post                      (post) => post qoshish
/seller-post/get-posts            (get) => 3ta buyer 3ta seller
/seller-post                      (get) => postlarni hammasini olish
/seller-post/:id                  (get) => postni id bilan olish
/seller-post/:id                  (put) => post update faqat ozinikini.
/seller-post/:id                  (delete) => post ochirish faqat ozinikini.

buyer POST

/buyer-post                      (post) => post qoshish
/buyer-post                      (get) => postlarni hammasini olish
/buyer-post/:id                  (get) => postni id bilan olish
/buyer-post/:id                  (put) => post update faqat ozinikini.
/buyer-post/:id                  (delete) => post ochirish faqat ozinikini.
