# IT3180_NNCNPM_Project
```
Name: Expense Tracker
Tech: React Native + Firestore
```

# Database specific description
![Alt text](Database/db.drawio.png)
### 6 bảng (collection):
#### 1. users: (người dùng)
-   user_id: mỗi khi đăng ký tài khoản sẽ sinh ra 1 user_id mới, dùng làm key
-   phoneNumber: bắt buộc khi đăng ký, dùng để đăng nhập
-   emailAuthen: email để xác thực tài khoản
-   citizen_id: id của cư dân liên kết với tài khoản
-   isAdmin: true/false, dùng để phân quyền đăng nhập
-	password: mật khẩu, bắt buộc
#### 2. households: (hộ khẩu)
-	household_id: tự sinh id riêng
-	members: danh sách id của các thành viên
-	address: địa chỉ của hộ gia đình
#### 3.	expenses: (khoản thu phí)
-	expense_id: tự sinh
-	category: danh mục khoản thu
-	total: tổng số tiền
-	create_date: ngày tạo khoản thu
-   payment_due_date: hạn khoản thu
-	description: mô tả của phiếu thu
#### 4.	donations: (khoản đóng góp)
-	expense_id: tự sinh
-	category: danh mục khoản thu
-	total: tổng số tiền
-	create_date: ngày tạo khoản thu
-   payment_due_date: hạn khoản thu
-	description: mô tả của phiếu thu
#### 5. donation_payment: (giao dịch)
-	donation_payment_id: id tự sinh
-	amount: số tiền giao dịch
-	date: ngày phát sinh giao dịch
-	donation_id: id của khoản đóng góp
-	household_id: id của chủ hộ
#### 6. expense_payment: (giao dịch)
-	expense_payment_id: id tự sinh
-	amount: số tiền giao dịch
-	date: ngày phát sinh giao dịch
-	expense_id: id của khoản thu phí
-	household_id: id của chủ hộ
#### 7. citizens(thông tin của dân cư)
-   citizen_id: mỗi khi đăng ký tài khoản sẽ sinh ra 1 user_id mới, dùng làm key
-   phone: số điện thoại của dân cư
-   ID_card_number: không bắt buộc, có thể dùng để đăng nhập
-   name: tên thật hiển thị trên hệ thống
-   address: địa chỉ của cư dân
-   birth: ngày sinh của cư dân
-   gender: giới tính của cư dân
-   email: email của cư dân
-	household_id: id của hộ gia đình cư dân
-   job: công việc của cư dân

