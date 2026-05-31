// src/declarations.d.ts

// Для SCSS модулей
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Для обычных SCSS файлов (глобальные стили)
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// Для CSS модулей (если используются)
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Для JSON (если импортируете напрямую)
declare module '*.json' {
  const value: any;
  export default value;
}