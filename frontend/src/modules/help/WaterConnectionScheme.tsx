import React, { useEffect } from "react";
import { Card, Typography, Space, Flex, Tag } from "antd";

const { Title, Paragraph, Text } = Typography;

const WaterConnectionInfo = () => {
  useEffect(() => {


    // @ts-ignore
    window.AnyComment = window.AnyComment || [];
    // @ts-ignore
    window.AnyComment.Comments = [];

    // @ts-ignore
    window.AnyComment.Comments.push({
      root: 'anycomment-app',
      app_id: 7063,
      language: 'ru',
    });

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://widget.anycomment.io/comment/embed.js';

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript.nextSibling);
    }
  }, []);


  return (
    <div style={{ padding: "24px" }}>
      <Flex justify="center" style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Согласование на монтаж системы водоснабжения
          <br />
          Лесосибирск, пер. Отрадный
        </Title>
      </Flex>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Описание подключения */}
        <Card>
          <Title level={3}>🔧 Подключение к водоснабжению</Title>
          <Paragraph>
            Устанавливаются <Text strong>точки подключения</Text> (колодцы) —
            места, откуда можно провести воду на участок.
          </Paragraph>
          <Paragraph type="danger">
            <b>Важно!!!!</b>: <Text strong>завод трубы от колодца до дома</Text>{" "}
            выполняется собственником самостоятельно.
          </Paragraph>
        </Card>

        {/* Пример расположения колодцев */}
        <Card>
          <Title level={4}>🏠 Пример расположения колодцев</Title>
          <Paragraph>Улица — 6 домов. Устанавливаются 3 колодца:</Paragraph>
          <ul>
            <li>
              Колодец 1 — дома <Text code>1</Text> и <Text code>2</Text>
            </li>
            <li>
              Колодец 2 — дома <Text code>3</Text> и <Text code>4</Text>
            </li>
            <li>
              Колодец 3 — дома <Text code>5</Text> и <Text code>6</Text>
            </li>
          </ul>
          <Paragraph>
            Каждый колодец — это отдельная работа: выемка грунта, установка
            бетонных колец, подключение к трубе и т.д.
          </Paragraph>
        </Card>

        {/* Оплата за колодцы */}
        <Card>
          <Title level={4}>
            💡 Пример оплаты за <b>колодцы</b>
          </Title>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Flex gap="small" align="center">
              <Tag color="blue">Колодец 1</Tag>
              <Text>Дома 1 и 2 + группа 3 (клиенты 3–6)</Text>
            </Flex>
            <Flex gap="small" align="center">
              <Tag color="green">Колодец 2</Tag>
              <Text>Дома 3 и 4 + группа 2 (клиенты 5, 6)</Text>
            </Flex>
            <Flex gap="small" align="center">
              <Tag color="orange">Колодец 3</Tag>
              <Text>Дома 5 и 6</Text>
            </Flex>
          </Space>
        </Card>

        {/* Оплата за трубы */}
        <Card>
          <Title level={4}>
            💰 Пример оплаты за <b>трубы</b>
          </Title>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Flex gap="small" align="center">
              <Tag color="red">Труба 1</Tag>
              <Text>Источник → Колодец 1 — платят клиенты 1–6</Text>
            </Flex>
            <Flex gap="small" align="center">
              <Tag color="red">Труба 2</Tag>
              <Text>Колодец 1 → Колодец 2 — платят клиенты 3–6</Text>
            </Flex>
            <Flex gap="small" align="center">
              <Tag color="red">Труба 3</Tag>
              <Text>Колодец 2 → Колодец 3 — платят клиенты 5 и 6</Text>
            </Flex>
          </Space>
        </Card>

        {/* Подробная логика оплаты */}
        {/* Принцип расчёта оплаты */}
        <Card>
          <Title level={4}>📊 Принцип расчёта оплаты</Title>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Text>
              • <Text strong>Колодцы</Text> оплачиваются только теми, кто к ним
              подключён напрямую, и теми, кто проходит через них к своему
              подключению.
            </Text>
            <Text>
              • Такие проходящие клиенты объединяются в{" "}
              <Text strong>группу</Text>, которая учитывается как{" "}
              <Text strong>один дополнительный "виртуальный" клиент</Text> при
              расчёте стоимости колодца.
            </Text>
            <Text>
              • <Text strong>Трубы</Text> оплачиваются всеми, кто использует
              соответствующий участок на пути к своему дому.
            </Text>
            <Text>
              • Чем дальше дом — тем больше участков трубы он использует и
              оплачивает.
            </Text>
            <Text type="secondary">
              Пример: Колодец 1 монтируют дома 1 и 2, но через него проходят
              клиенты 3–6 — они считаются группой и участвуют в оплате как один
              дополнительный клиент.
            </Text>
          </Space>
        </Card>

        {/* Что входит в стоимость */}
        <Card>
          <Title level={4}>📦 Что входит в стоимость</Title>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Text>• Материалы: бетонные кольца, люки, трубы</Text>
            <Text>• Работы: земляные, монтаж, прокол дорог и т.д.</Text>
            <Text>• Работа прораба, логистика и организация процесса</Text>
          </Space>
        </Card>
      </Space>
      <div id="anycomment-app" />
    </div>
    
  );
};

export default WaterConnectionInfo;
