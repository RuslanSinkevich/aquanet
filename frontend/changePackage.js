//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// автор: Синкевич Руслан Николаевич
///
/// Скрипт запускает поиск доступных версий пакетов в кастомном репозитории
/// перед активацией удаляем node_module и package_lock.json
/// очищаем кеш -> npm cache clean --force
/// запускаем скрипт -> node changePackage.js
///
/// Рекомендуется запускать скрипт раз в 4 дня при этом удалять все пакеты из overrides
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { execSync } from "child_process";
import { get } from "https";
import { writeFileSync, readFileSync } from "fs";

// Проверка, что версия соответствует формату "major.minor.patch"
const isValidVersion = (version) => {
  const versionPattern = /^\d+\.\d+\.\d+$/; // Строгая проверка на три числа в версии (major.minor.patch)
  return versionPattern.test(version);
};

// Получение списка доступных версий пакета
const getAvailableVersions = (pkg) => {
  try {
    console.log(`Пакет =>>>>>>> npm view ${pkg} versions --json`);
    const result = execSync(`npm view ${pkg} versions --json`, {
      encoding: "utf-8",
    });

    const versions = JSON.parse(result);

    // Фильтрация версий, оставляем только те, которые соответствуют формату "major.minor.patch"
    const validVersions = versions.filter(isValidVersion);

    return validVersions.reverse(); // Сортируем версии по убыванию (с конца)
  } catch (error) {
    console.error(`Ошибка при получении версий для ${pkg}: ${error.message}`);
    return [];
  }
};

// Функция для проверки доступности версии пакета через HTTP-запрос
const isVersionAvailable = (pkg, version) => {
  const tarballUrl = execSync(`npm view ${pkg}@${version} dist.tarball`, {
    encoding: "utf-8",
  }).trim();
  console.log(`Ссылка ${tarballUrl}`);
  return new Promise((resolve) => {
    get(tarballUrl, (res) => {
      // Если статус 200, то пакет доступен
      if (res.statusCode === 200) {
        console.log(
          `Версия ${pkg}@${version} доступна по ссылке: ${tarballUrl}`
        );
        resolve(true); // Версия доступна
      } else {
        console.error(
          `Версия ${pkg}@${version} недоступна. Статус: ${res.statusCode}`
        );
        resolve(false); // Версия недоступна
      }
    }).on("error", (err) => {
      console.error(`Ошибка при запросе: ${err.message}`);
      resolve(false); // Если произошла ошибка в запросе
    });
  });
};

// Функция для поиска доступной версии, начиная с самой новой
const findAvailableVersionFromNewest = async (pkg) => {
  const availableVersions = getAvailableVersions(pkg); // Получаем версии пакета

  for (let i = 0; i < availableVersions.length; i++) {
    const version = availableVersions[i];
    const isAvailable = await isVersionAvailable(pkg, version);
    if (isAvailable) {
      return version; // Возвращаем первую доступную версию
    }
  }

  return null; // Если не нашли доступную версию
};

// Обновление версии пакета непосредственно в dependencies или devDependencies
const updatePackageVersion = (pkg, version, packageJson) => {
  if (packageJson.dependencies && packageJson.dependencies[pkg]) {
    packageJson.dependencies[pkg] = `^${version}`; // Обновляем в dependencies
  }
  if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
    packageJson.devDependencies[pkg] = `^${version}`; // Обновляем в devDependencies
  }
};

// Функция для обработки пакетов из dependencies и devDependencies
const checkTopLevelPackages = async () => {
  const packageJsonPath = "./package.json";
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});

  const allPackages = [...dependencies, ...devDependencies];

  for (const pkg of allPackages) {
    console.log(`Проверка пакета ${pkg}...`);
    const availableVersion = await findAvailableVersionFromNewest(pkg);
    if (availableVersion) {
      console.log(`Найдена доступная версия для ${pkg}: ${availableVersion}`);
      updatePackageVersion(pkg, availableVersion, packageJson);
    } else {
      console.error(`Не удалось найти доступную версию для ${pkg}.`);
    }
  }

  // Сохраняем обновленный package.json
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Обновленный package.json успешно сохранен.");
};

// Запуск проверки пакетов
checkTopLevelPackages();
