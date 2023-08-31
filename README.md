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
/admin/delete-buyer-post/:id  (delete) => buyer post o'chirish.