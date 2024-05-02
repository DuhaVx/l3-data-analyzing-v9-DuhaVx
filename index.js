const fs = require('fs');
const path = require('path');

function analyzeVacanciesData(data) {
    const rows = data.trim().split("\n");
    const header = rows[0].split(';');
    const records = rows.slice(1); // Исключаем заголовок
    
    const cityIndex = header.indexOf("Город");
    const salaryIndex = header.indexOf("Зарплата");
    const educationIndex = header.indexOf("Образование");
    const companyTypeIndex = header.indexOf("Компания");

    let cities = [];
    let maxSalary = 0;
    let graduatesCount = 0;
    let companyTypesCount = {};

    records.forEach(record => {
        const columns = record.split(';');
 
        // Собираем все встречающиеся города, даже дублирующие
        cities.push(columns[cityIndex]);
        
        // Расчет максимальной зарплаты
        const salary = parseInt(columns[salaryIndex].replace(' руб.', ''));
        maxSalary = Math.max(maxSalary, salary);
        
        // Подсчет вакансий с требованием "высшее образование"
        if (columns[educationIndex].toLowerCase().includes('высшее')) {
            graduatesCount++;
        }
        
        // Сбор информации о правовых формах компаний
        const companyType = columns[companyTypeIndex].split(' ')[0];
        companyTypesCount[companyType] = (companyTypesCount[companyType] || 0) + 1;
    });

    console.log(`Count: ${records.length}`);
    console.log(`Cities: ${cities.join(', ')}`);
    console.log(`Maximum salary: ${maxSalary}`);
    console.log(`Graduated: ${graduatesCount}`);
    console.log(`Legal type of company and their number: ${JSON.stringify(companyTypesCount)}`);
}

function run() {
    const filePath = process.argv[2]; // Получаем путь файла из аргументов командной строки
    if (!filePath) {
        console.error('Please provide the file path');
        process.exit(1);
    }

    const absolutePath = path.resolve(__dirname, filePath);
    fs.readFile(absolutePath, 'utf8', (err, content) => {
        if (err) {
            console.error(err.message);
            return;
        }
        
        analyzeVacanciesData(content);
    });
}

if (require.main === module) {
    run();
}

module.exports = analyzeVacanciesData;

