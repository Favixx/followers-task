Реалізація проекту
Проект зібраний за допомогою Vite. В якості backend використано mockapi.io. Реалізовано: Головна сторінка, Сторінка Tweets, на якій відображаються картки з інформацією про tweet (аватар, кількість твіттів, кількість підписників та кнопка Follow з можливістю підписатись на tweet) Працює пагінація при натиску на кнопку Load More відбувається запит на бєкенд і відмальовка наступних карток Кнопка Go Back для повернення на попередню сторінку Автоматичне перенаправлення користувача на домашню сторінку у випадку переходу на неіснуючий шлях.
Для запуску проекту локально склонуйте репозиторій, в терміналі пропишіть npm i, після чого пропишіть npm run dev, за умови що порт 5173 вільний додаток буде доступний за адресою: localhost:5173/followers-task
