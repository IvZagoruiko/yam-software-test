# YamSoftwareTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Инструкция
Для входа в приложение можно использовать username и password любого пользователя с https://fakestoreapi.com/docs (например username = "'johnd", password = "m38rmF$")

Для выхода из приложения можно использовать меню в правом верхнем углу екрана. Меню появляется по клику на username или иконку пользователя.

После входа в приложение, пользователь попадает на страницу продуктов. Продукты подгружаются по мере прокрутки екрана вниз. Апи возвращает всего 20 продуктов.
Поэтому продукты повторяются. Для имитации различий, продуктам присваиваются уникальные id.

Продукты можно добавить в корзину, нажав соответствующую кнопку в блоке продукта. Для просмотра содержимого корзины, можно использовать кнопку в правом верхнем углу.
На кнопке, в скобках, пишется коллическтво добавленых товаров (включая дубликаты).

В окне просмотра содержимого корзины отображается таблица с продуктами. В таблицу выводится изображение товара, название, цена за единицу (в скобках, общая сумма, если есть дубликаты),
колличество дубликатов. Так же присутствуют кнопки, для добавления или удаления товара уже присутствующего в корзине. Если колличество товара добавленного в корзину
становится равно нулю, то товар удаляется из корзины. На кнопке Buy, в скобках, выводится общая стоимость всех товаров в корзине.
В окне доступна кнопка, для очистки корзины. Если в корзине нет товаров, то выводится надпись о том, что корзина пуста.

Если пользователь выходит из приложения (logout), то корзина очищается.
