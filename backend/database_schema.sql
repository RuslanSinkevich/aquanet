-- База данных для управления водопроводными подключениями
-- Создание базы данных
-- CREATE DATABASE aquanet;

-- Таблица пользователей (регистрация и роли)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  house_number TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  is_confirmed BOOLEAN DEFAULT false,
  banned BOOLEAN DEFAULT false,
  role INTEGER NOT NULL DEFAULT 2, -- 0=ADMIN,1=PRORAB,2=USER
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP
);

-- Комментарии к таблице пользователей
COMMENT ON TABLE users IS 'Пользователи системы с ролями и аутентификацией';
COMMENT ON COLUMN users.id IS 'Уникальный идентификатор пользователя';
COMMENT ON COLUMN users.first_name IS 'Имя пользователя';
COMMENT ON COLUMN users.last_name IS 'Фамилия пользователя';
COMMENT ON COLUMN users.phone IS 'Телефон пользователя';
COMMENT ON COLUMN users.house_number IS 'Номер дома пользователя';
COMMENT ON COLUMN users.password_hash IS 'Хэш пароля пользователя';
COMMENT ON COLUMN users.is_confirmed IS 'Флаг подтверждения пользователя';
COMMENT ON COLUMN users.banned IS 'Флаг банного пользователя';
COMMENT ON COLUMN users.role IS 'Роль пользователя: 0=Администратор, 1=Прораб, 2=Пользователь';
COMMENT ON COLUMN users.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN users.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN users.deleted_at IS 'Дата и время мягкого удаления записи';

-- Точки подключения (колодцы, узлы)
CREATE TABLE connection_points (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position_m INTEGER,               -- позиция (расстояние) для расчёта удалённости
  total_cost NUMERIC,              -- фиксированная стоимость колодца
  comment TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP
);

-- Комментарии к таблице точек подключения
COMMENT ON TABLE connection_points IS 'Точки подключения к водопроводной сети (колодцы, узлы)';
COMMENT ON COLUMN connection_points.id IS 'Уникальный идентификатор точки подключения';
COMMENT ON COLUMN connection_points.name IS 'Название точки подключения';
COMMENT ON COLUMN connection_points.position_m IS 'Позиция точки в метрах от начальной точки';
COMMENT ON COLUMN connection_points.total_cost IS 'Общая стоимость точки подключения в рублях';
COMMENT ON COLUMN connection_points.comment IS 'Дополнительные комментарии к точке подключения';
COMMENT ON COLUMN connection_points.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN connection_points.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN connection_points.deleted_at IS 'Дата и время мягкого удаления записи';

-- Материалы (трубы, кольца, фитинги)
CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  unit TEXT DEFAULT 'шт',
  unit_cost NUMERIC NOT NULL CHECK (unit_cost >= 0),
  comment TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP
);

-- Комментарии к таблице материалов
COMMENT ON TABLE materials IS 'Справочник материалов для водопроводных работ';
COMMENT ON COLUMN materials.id IS 'Уникальный идентификатор материала';
COMMENT ON COLUMN materials.type IS 'Тип материала (труба ПНД, кольцо бетонное, фитинг и т.д.)';
COMMENT ON COLUMN materials.unit IS 'Единица измерения материала (шт, м, кг и т.д.)';
COMMENT ON COLUMN materials.unit_cost IS 'Стоимость за единицу материала в рублях';
COMMENT ON COLUMN materials.comment IS 'Дополнительные комментарии к материалу';
COMMENT ON COLUMN materials.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN materials.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN materials.deleted_at IS 'Дата и время мягкого удаления записи';

-- Работы и затраты с указанием участвующих пользователей и материалов
CREATE TABLE work_items (
  id SERIAL PRIMARY KEY,
  connection_point_id INTEGER REFERENCES connection_points(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  material_id INTEGER REFERENCES materials(id),
  quantity NUMERIC CHECK (quantity >= 0),
  cost NUMERIC NOT NULL CHECK (cost >= 0),
  user_ids INTEGER[] NOT NULL,  -- участники оплаты (пользователи)
  comment TEXT,
  work_date DATE,               -- дата фактической работы
  doc_links TEXT[],             -- ссылки на документы/чеки
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP
);

-- Комментарии к таблице работ
COMMENT ON TABLE work_items IS 'Работы и затраты по точкам подключения';
COMMENT ON COLUMN work_items.id IS 'Уникальный идентификатор работы';
COMMENT ON COLUMN work_items.connection_point_id IS 'Идентификатор точки подключения, к которой относится работа';
COMMENT ON COLUMN work_items.description IS 'Описание выполненной работы';
COMMENT ON COLUMN work_items.material_id IS 'Идентификатор использованного материала';
COMMENT ON COLUMN work_items.quantity IS 'Количество использованного материала';
COMMENT ON COLUMN work_items.cost IS 'Общая стоимость работы в рублях';
COMMENT ON COLUMN work_items.user_ids IS 'Массив идентификаторов пользователей, участвующих в оплате';
COMMENT ON COLUMN work_items.comment IS 'Дополнительные комментарии к работе';
COMMENT ON COLUMN work_items.work_date IS 'Дата фактического выполнения работы';
COMMENT ON COLUMN work_items.doc_links IS 'Массив ссылок на документы, чеки, фотографии';
COMMENT ON COLUMN work_items.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN work_items.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN work_items.deleted_at IS 'Дата и время мягкого удаления записи';

-- Связь пользователя с колодцем (точкой подключения)
CREATE TABLE user_connection_points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  connection_point_id INTEGER REFERENCES connection_points(id) ON DELETE CASCADE,
  connected_at TIMESTAMP DEFAULT now(),  -- дата подключения пользователя
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP
);

-- Комментарии к таблице связей пользователей с точками подключения
COMMENT ON TABLE user_connection_points IS 'Связь пользователей с точками подключения';
COMMENT ON COLUMN user_connection_points.id IS 'Уникальный идентификатор связи';
COMMENT ON COLUMN user_connection_points.user_id IS 'Идентификатор пользователя';
COMMENT ON COLUMN user_connection_points.connection_point_id IS 'Идентификатор точки подключения';
COMMENT ON COLUMN user_connection_points.connected_at IS 'Дата и время подключения пользователя к точке';
COMMENT ON COLUMN user_connection_points.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN user_connection_points.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN user_connection_points.deleted_at IS 'Дата и время мягкого удаления записи';

-- Оплаты, внесённые пользователями (касса)
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount >= 0), -- сумма внесённая пользователем
  payment_date TIMESTAMP DEFAULT now(),
  doc_link TEXT,                               -- ссылка на чек или квитанцию
  comment TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP
);

-- Комментарии к таблице платежей
COMMENT ON TABLE payments IS 'Платежи, внесённые пользователями в общую кассу';
COMMENT ON COLUMN payments.id IS 'Уникальный идентификатор платежа';
COMMENT ON COLUMN payments.user_id IS 'Идентификатор пользователя, внёсшего платёж';
COMMENT ON COLUMN payments.amount IS 'Сумма платежа в рублях';
COMMENT ON COLUMN payments.payment_date IS 'Дата и время внесения платежа';
COMMENT ON COLUMN payments.doc_link IS 'Ссылка на документ, подтверждающий платёж (чек, квитанция)';
COMMENT ON COLUMN payments.comment IS 'Комментарий к платежу';
COMMENT ON COLUMN payments.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN payments.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN payments.deleted_at IS 'Дата и время мягкого удаления записи';

-- Возвраты (когда нужно вернуть деньги пользователям)
CREATE TABLE refunds (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,  -- кому возвращаем
  amount NUMERIC NOT NULL CHECK (amount >= 0),            -- сумма возврата
  refund_date TIMESTAMP DEFAULT now(),
  doc_link TEXT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP
);

-- Комментарии к таблице возвратов
COMMENT ON TABLE refunds IS 'Возвраты денежных средств пользователям';
COMMENT ON COLUMN refunds.id IS 'Уникальный идентификатор возврата';
COMMENT ON COLUMN refunds.user_id IS 'Идентификатор пользователя, которому возвращаются средства';
COMMENT ON COLUMN refunds.amount IS 'Сумма возврата в рублях';
COMMENT ON COLUMN refunds.refund_date IS 'Дата и время возврата средств';
COMMENT ON COLUMN refunds.doc_link IS 'Ссылка на документ, подтверждающий возврат';
COMMENT ON COLUMN refunds.comment IS 'Комментарий к возврату';
COMMENT ON COLUMN refunds.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN refunds.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN refunds.deleted_at IS 'Дата и время мягкого удаления записи';

-- Создание индексов для оптимизации запросов
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_work_items_connection_point ON work_items(connection_point_id);
CREATE INDEX idx_work_items_material ON work_items(material_id);
CREATE INDEX idx_work_items_work_date ON work_items(work_date);
CREATE INDEX idx_user_connection_points_user ON user_connection_points(user_id);
CREATE INDEX idx_user_connection_points_connection ON user_connection_points(connection_point_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_date ON payments(payment_date);
CREATE INDEX idx_refunds_user ON refunds(user_id);
CREATE INDEX idx_refunds_date ON refunds(refund_date);

-- Вставка начальных данных
INSERT INTO users (first_name, last_name, phone, house_number, password_hash, role) VALUES 
('admin', 'admin', '1234567890', '1', '$2b$10$example_hash', 0); -- Администратор по умолчанию

-- Комментарии к индексам
COMMENT ON INDEX idx_users_phone IS 'Индекс для быстрого поиска пользователей по телефону';
COMMENT ON INDEX idx_users_role IS 'Индекс для фильтрации пользователей по ролям';
COMMENT ON INDEX idx_work_items_connection_point IS 'Индекс для поиска работ по точке подключения';
COMMENT ON INDEX idx_work_items_material IS 'Индекс для поиска работ по материалу';
COMMENT ON INDEX idx_work_items_work_date IS 'Индекс для поиска работ по дате выполнения';
COMMENT ON INDEX idx_user_connection_points_user IS 'Индекс для поиска подключений по пользователю';
COMMENT ON INDEX idx_user_connection_points_connection IS 'Индекс для поиска пользователей по точке подключения';
COMMENT ON INDEX idx_payments_user IS 'Индекс для поиска платежей по пользователю';
COMMENT ON INDEX idx_payments_date IS 'Индекс для поиска платежей по дате';
COMMENT ON INDEX idx_refunds_user IS 'Индекс для поиска возвратов по пользователю';
COMMENT ON INDEX idx_refunds_date IS 'Индекс для поиска возвратов по дате'; 