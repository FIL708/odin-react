const fs = require('fs')
const path = require('path')

let componentName = process.argv[2]

if (!componentName) {
    console.log('\n' + '\x1b[41m 💀 Error \x1b[0m')
    console.error(' You must provide a component name!')
    process.exit(1)
}

const formattedComponentName = String(componentName).charAt(0).toUpperCase() + String(componentName).slice(1)

const componentsDir = path.join(__dirname, '..', 'src', 'components')

const newComponentDir = path.join(componentsDir, formattedComponentName)

if (fs.existsSync(newComponentDir)) {
    console.log(
        '\n',
        `\x1b[45m 🧊 ${formattedComponentName} \x1b[0m` + '\x1b[41m 💀 Error \x1b[0m'
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
    `\x1b[45m 🧊 ${formattedComponentName} \x1b[0m` + '\x1b[44m 💀 Creating... \x1b[0m'
)
console.log(' 📁 Directory for component files created successfully...')
console.log(`    \x1b[34m${newComponentDir}\x1b[0m \n`)

const componentContent = `import './${formattedComponentName}.css';

const ${formattedComponentName} = () => {
  return (
    <div className="${formattedComponentName.toLowerCase()}">
      ${formattedComponentName} Component
    </div>
  );
};

export default ${formattedComponentName};
`
const cssContent = `.${formattedComponentName.toLowerCase()} {
    /* Style for the ${formattedComponentName} component */
  }
`

const indexContent = `export { default } from './${formattedComponentName}';
`

const unitTestContent = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ${formattedComponentName} from './${formattedComponentName}';

describe('${formattedComponentName}', () => {
    it('should render properly', () => {
      render(<${formattedComponentName} />);
      const element = screen.getByText('${formattedComponentName} Component');
      expect(element).toBeInTheDocument();
    });
});
`

const storybookContent = `import type { Meta, StoryObj } from '@storybook/react'
import ${formattedComponentName} from './${formattedComponentName}'

const meta: Meta<typeof ${formattedComponentName}> = {
    component: ${formattedComponentName},
    title: '${formattedComponentName}',
}

export default meta

type Story = StoryObj<typeof ${formattedComponentName}>

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
    `${formattedComponentName}.tsx`,
    componentContent,
    'component',
    '🧊'
)
createFile(
    newComponentDir,
    `${formattedComponentName}.css`,
    cssContent,
    'styles',
    '🎨'
)
createFile(newComponentDir, 'index.ts', indexContent, 'index', '🚗')

createFile(
    newComponentDir,
    `${formattedComponentName}.spec.tsx`,
    unitTestContent,
    'tests',
    '🧪'
)
createFile(
    newComponentDir,
    `${formattedComponentName}.stories.tsx`,
    storybookContent,
    'stories',
    '📖'
)

console.log(
    '\n',
    `\x1b[45m 🧊 ${formattedComponentName} \x1b[0m` +
        '\x1b[42m Components files created successfully 🎉🎉🎉 \x1b[0m'
)
