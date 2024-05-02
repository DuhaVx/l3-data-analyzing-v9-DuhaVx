const fs = require('fs');
const path = require('path');

function analyzeVacanciesData(data) {
  const rows = data.trim().split('\n');
  const header = rows[0].split(';');
  const records = rows.slice(1);

  const cityIndex = header.indexOf('Город');
  const salaryIndex = header.indexOf('Зарплата');
  const educationIndex = header.indexOf('Образование');
  const companyTypeIndex = header.indexOf('Компания');

  // eslint-disable-next-line prefer-const
  let cities = [];
  let maxSalary = 0;
  let graduatesCount = 0;
  // eslint-disable-next-line prefer-const
  let companyTypesCount = {};

  records.forEach((record) => {
    const columns = record.split(';');

    cities.push(columns[cityIndex]);

    const salary = parseInt(columns[salaryIndex].replace(' руб.', ''), 10);
    maxSalary = Math.max(maxSalary, salary);

    if (columns[educationIndex].toLowerCase().includes('высшее')) {
      // eslint-disable-next-line no-plusplus
      graduatesCount++;
    }

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
  const filePath = process.argv[2];
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
