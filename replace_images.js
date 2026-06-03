const fs = require('fs');
const path = require('path');

const images = [
  '/images/phmi-1.jpeg',
  '/images/phmi-2.jpg',
  '/images/phmi-4.jpeg',
  '/images/phmi-5.jpeg',
  '/images/phmi-6.jpeg',
  '/images/phmi-7.jpeg',
  '/images/phmi-8.jpeg',
  '/images/phmi-9.jpeg',
  '/images/phmi-10.jpeg',
  '/images/phmi-11.jpg',
  '/images/phmi-13.jpeg',
  '/images/phmi-14.jpg',
  '/images/phmi-16.jpeg',
  '/images/phmi-17.png',
  '/images/phmi-18.jpeg',
  '/images/phmi-19.jpeg',
  '/images/phmi-20.jpeg',
  '/images/phmi-21.jpeg',
  '/images/phmi-22.jpeg',
  '/images/phmi-23.png',
  '/images/phmi-24.png'
];

let imgIndex = 0;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = [...walk('./app'), ...walk('./components')];

const regex = /https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9\-]+(\?w=\d+&q=\d+)?/g;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (regex.test(content)) {
        content = content.replace(regex, (match) => {
            const replacement = images[imgIndex % images.length];
            imgIndex++;
            return replacement;
        });
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
