const fs = require('fs')
const path = require('path')

const componentName = process.argv[2]

if (!componentName) {
    console.log('\n' + '\x1b[41m 💀 Error \x1b[0m')
    console.error(' You must provide a component name!')
    process.exit(1)
}

const componentsDir = path.join(__dirname, '..', 'src', 'components')

const newComponentDir = path.join(componentsDir, componentName)

if (fs.existsSync(newComponentDir)) {
    console.log(
        '\n',
        `\x1b[45m 🧊 ${componentName} \x1b[0m` + '\x1b[41m 💀 Error \x1b[0m'
    )
    console.error(' Such a component already exists!')
    console.log(` ${newComponentDir} \n`)

    process.exit(1)
}

if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir)
}

fs.mkdirSync(newComponentDir)
console.log(
    '\n',
    `\x1b[45m 🧊 ${componentName} \x1b[0m` + '\x1b[44m 💀 Creating... \x1b[0m'
)
console.log(' 📁 Directory for component files created successfully...')
console.log(`    \x1b[34m${newComponentDir}\x1b[0m \n`)

const componentContent = `import './${componentName}.css';

const ${componentName} = () => {
  return (
    <div className="${componentName.toLowerCase()}">
      ${componentName} Component
    </div>
  );
};

export default ${componentName};
`
const cssContent = `.${componentName.toLowerCase()} {
    /* Style for the ${componentName} component */
  }
`

const indexContent = `export { default } from './${componentName}';
`

const unitTestContent = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ${componentName} from './${componentName}';

describe('${componentName}', () => {
    it('should render properly', () => {
      render(<${componentName} />);
      const element = screen.getByText('${componentName} Component');
      expect(element).toBeInTheDocument();
    });
});
`

const storybookContent = `import type { Meta, StoryObj } from '@storybook/react'
import ${componentName} from './${componentName}'

const meta: Meta<typeof ${componentName}> = {
    component: ${componentName},
    title: '${componentName}',
}

export default meta

type Story = StoryObj<typeof ${componentName}>

export const Primary: Story = {
    args: {},
}

`
const createFile = (dir, fileName, content, type, icon) => {
    const fileType = type.toLowerCase()
    const capitalizeFileType =
        fileType.charAt(0).toUpperCase() + fileType.slice(1)
    try {
        fs.writeFileSync(path.join(dir, fileName), content)
        console.log(
            ` ${icon} \x1b[34m ${fileName} \x1b[0m ${capitalizeFileType} file created successfully...`
        )
    } catch (error) {
        console.log('\n' + '\x1b[41m 💀 Error \x1b[0m')
        console.error(
            ` Something went wrong during the creation of the ${fileType} file.`
        )
        process.exit(1)
    }
}

createFile(
    newComponentDir,
    `${componentName}.tsx`,
    componentContent,
    'component',
    '🧊'
)
createFile(
    newComponentDir,
    `${componentName}.css`,
    cssContent,
    'styles',
    '🎨'
)
createFile(newComponentDir, 'index.ts', indexContent, 'index', '🚗')
createFile(
    newComponentDir,
    `${componentName}.spec.tsx`,
    unitTestContent,
    'tests',
    '🧪'
)
createFile(
    newComponentDir,
    `${componentName}.stories.tsx`,
    storybookContent,
    'stories',
    '📖'
)

console.log(
    '\n',
    `\x1b[45m 🧊 ${componentName} \x1b[0m` +
        '\x1b[42m Components files created successfully 🎉🎉🎉 \x1b[0m'
)
