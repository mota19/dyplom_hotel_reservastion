
# 📘 Розробка інформаційної системи для бронювання номерів у готелях і апартаментах


Веб-застосунок для бронювання готелів і апартаментів з адміністративною панелю, і авотризацією


## 👤 Автор

- **ПІБ**: Мота Богдан Володимирович
- **Група**: ФЕІ-43
- **Керівник**: Корчак Юрій Михайлович, кандидат фізико-математичних наук, заступник директора з навчальної роботи Інституту післядипломної освіти та доуніверситетської підготовки, доцент кафедри оптоелектроніки та інформаційних технологій
- **Дата виконання**: 30.05.2025


## 📌 Загальна інформація

- **Тип проєкту**: Вебсайт
- **Мова програмування**: TypeScript (Next.js)
- **Фреймворки / Бібліотеки**: React, Next.js, Tailwind CSS, Supabase, Redux Toolkit
## 🧠 Опис функціоналу

- Реєстрація та авторизація користувачів (включно з OAuth)
- Додавання, видалення бронювань користувачем
- Збереження даних у базу даних Supabase
- REST API для взаємодії між frontend та backend
- Перегляд та фільтрація номерів за містом, ціною та рейтингом, зручностями
- Бронювання з вибором дат і кількості гостей
- Адміністративна панель (керування житлом, кімнатами, бронюваннями, загальна інофрмація з статистикою)
 
## 🧱 Опис основних каталогів / файлів

| Каталог / Файл     | Призначення |
|----------------|-------------|
| `app/page.tsx`      | Головна сторінка |
| `app/abou/page.tsx`    | Сторінка About |
| `app/booking/page.tsx` | Сторінка зі списком бронювань |
| `app/privacy-policy/page.tsx` | Сторінка з політикою конфіденційності  |
| `app/profile/page.tsx` | Сторінка з інформацією про профіль |
| `app/sign-in/page.tsx` | Сторінка логіну |
| `app/sign-up/page.tsx` | Сторінка з реєстрацією |
| `app/sign-in/admin/accommodation/page.tsx` | Сторінка accommodation в адміністративній панелі  |
| `app/sign-up/admin/booking/page.tsx` | Сторінка booking в адміністративній панелі |
| `app/sign-in/admin/dashboard/page.tsx` | Сторінка dashboard в адміністративній панелі |
| `app/sign-up/admin/rooms/page.tsx` | Сторінка rooms в адміністративній панелі |
| `app/sign-in/page.tsx` | Сторінка логіну |
| `app/sign-up/page.tsx` | Сторінка з реєстрацією |
| `app/_supabase/adminApi.ts` | Містить API-запити для адміністраторської частини системи |
| `app/_supabase/apiUser.ts` | Містить API-запити для керування користувачем |
| `app/_supabase/hotelApi.ts` | Містить API-запити пов’язані з помешканнями |
| `app/_supabase/supabase.ts` | Конфігурація Supabase |
| `app/_components` | Каталог зі списком компонентів |
| `/ComponentsAdmin` | Каталог зі списком компонентів для адміністративної панелі |
| `/redux` | Каталог з redux toolkit |


## ▶️ Як запустити проєкт "з нуля"

### 1. Встановлення інструментів

- Node.js v22.16.0 + npm v10.9.2

### 2. Клонування репозиторію

```bash
git clone https://github.com/mota19/dyplom_hotel_reservastion.git
cd dyplom_hotel_reservastion
```

### 3. Встановлення залежностей

```bash
npm install
```

### 4. Запуск

```bash
npm run dev
```
##  🔌 API приклади

Усі запити до бази даних здійснюються через Supabase JavaScript SDK.
API ключ зберігається у файлі `.env.local`:

### 🔐 Авторизація

**Видалити бронювання**
```
export async function deleteBooking(id: number) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  return { error };
}
```

**Отримати помешкання**
```
export const getAccomodationByUser = async (user_id: string) => {
  const { data, error } = await supabase
    .from("accommodations")
    .select(
      `id, name, type_id (name), description, city, country, star_rating, image`,
    )
    .eq("user_id", user_id);

  if (error || !data) return { data: null, error };

  console.log(data);
  return { data, error: null };
};
```
**Response:**
```json
[
    {
        "id": 63,
        "name": "Alpine Lodge",
        "description": "Nestled in the heart of the Austrian Alps, Alpine Lodge offers a tranquil escape surrounded by snow-covered peaks and pine forests. Enjoy the rustic charm of wooden interiors, a crackling fireplace, and breathtaking mountain views right from your window — perfect for winter retreats and hiking adventures.",
        "city": "Innsbruck",
        "country": "Austria",
        "star_rating": 8,
        "image": "https://wuyjwewhunrbgamxmsrz.supabase.co/storage/v1/object/public/images/045d8b96-bba6-4f58-b40d-e92e4d70e9e1/1748002822563-lodge.webp",
        "type_id": {
            "name": "Cabin"
        }
    }
]
```

**Отримати кімнати**
```
export const getRoomsByUser = async (user_id: string) => {
  const { data, error } = await supabase
    .from("user_rooms_view")
    .select("*")
    .eq("owner_id", user_id);

  if (error || !data) return { data: null, error };

  console.log(data);
  return { data, error: null };
};
```
**Response:**
```json
[
    {
        "id": 23,
        "accommodation_id": 62,
        "name": "Modern Studio",
        "description": "Fully equipped studio apartment in the city center.",
        "capacity": 2,
        "pricepernight": 100,
        "room_type": "Studio",
        "image": "https://wuyjwewhunrbgamxmsrz.supabase.co/storage/v1/object/public/rooms/045d8b96-bba6-4f58-b40d-e92e4d70e9e1/1747912609308-274817293.jpg",
        "discount": 0,
        "sqm": 25,
        "owner_id": "045d8b96-bba6-4f58-b40d-e92e4d70e9e1",
        "accommodationname": "Sunset Paradise Hotel"
    }
]
```


## 🖱️ Інструкція для користувача

1. **🔐 Екран входу (Login)**
- **Email** — поле для введення електронної пошти (наприклад: `username@gmail.com`)
- **Password** — поле для введення пароля
- **Remember me** — чекбокс, щоб залишитися в системі після закриття браузера
- **Forgot password?** — посилання для відновлення пароля
- **Sign in** — основна кнопка входу
- Вхід через **Google**
- Вхід через **Discord**
2. 📝 **Екран реєстрації (Sign Up)**
- **Email** — поле для введення електронної пошти
- **Password** — поле для введення пароля
- **Repeat password** — повторне введення пароля для підтвердження
- **Continue** — кнопка для переходу до наступного етапу
- Вхід через **Google**
- Вхід через **Discord**
- Вхід через **Facebook**
- Якщо користувач уже має обліковий запис, він може натиснути **Sign in**
 **Другий етап заповнення форми**:
- **First Name** — поле для введення імені
- **Last Name** — поле для введення прізвища
- **Date of birthday** — поле для вибору дати народження
- **Phone number** — поле для введення номера телефону
- **Country** — поле для введення країни проживання
- **Choose your role** — вибір типу облікового запису: **User** або **Host**
- **Previous** — повернення до попереднього етапу
- **Continue** — перехід до завершення реєстрації
**Третій етап заповнення форми**:
- **Ввести код з email**
- Кнопка **Sign Up** — завершення реєстрації.
3. **Головна сторінка "Home"**
- **Location** — поле для введення місця призначення.
- **Check-in/Check-out** — вибір дати заїзду та виїзду.
- **Guests** — кількість гостей.
- **→ (пошук)** — кнопка запуску пошуку.
- **Popular destinations** - вибір популярних напрямків
- **Browse by property type** - вибрі типу помешкання
- **Popular Hotels** - вибір популярних готелів
4. **Сторінка "Bookings"**
- **Destination** — поле для введення місця призначення.
- **Check-in/Check-out** — вибір дати заїзду та виїзду.
- **Guests** — кількість гостей.
- **Search** — кнопка запуску пошуку.
- **Фільтри** - всі інші фільтри застосовуються одразу якщо поставити галочку.
- **Book** - перейти на сторінку з детальою інформацією
5. **Сторінка з детальою інформацією** 
- **Book now for** - забронювати вибрану кімнату 
6. **Сторінка "Profile"**
- **Edit** - оновити інформацію користувача
- **Save** - зберегти інформацію
- **Sign in** - зайти у відповідний стороній сервіс
- **Delete** - видалити кімнату
7. **header**
- **sing in** - авторизація існуючого користувача
- **sign up** - зареєтрувати користувача
- **Log out** - вийти з аккаунту 
- **Admin** - перейти в адміністративну панель

### Адміністративна панель

- **Dashboard** - сторінка зі статистикою і  графіками
- **Bookings** - таблиця з бронюваннями 
- **Rooms** - таблиця з кімнатами адміністратора
- **Add new rooms** - відкриває модальне вікно з формою для створення нової кіманти
- **Delete** - видалити кімнату
- **Edit** - оновити існуючу кімнату
- **Accommodation** - таблиця з помешканнями адміністратора
- **Add new accommodation** - відкриває модальне вікно з формою для створення нового житла
- **Delete** - видалити житло
- **Edit** - оновити існуюче житло










## 📷 Приклади / скриншоти

Всі скриншоти знаходяться в папці `/screenshots`

- Головна сторінка
- Сторінка "Booking"
- Сторінка "Profile"
- Сторінка "About"
- Сторінка з детальною інформацією
- Логін
- Реєстрація
- Адмінстративна панель (Dashboard, Rooms, Accommodations, Bookings)


## 🧾 Використані джерела / література

- React офіційна документація
- Next.js офіційна документація
