![cog icon](src/icons/cog.svg?raw=true)
![cog icon](src/icons/document.svg?raw=true)
![cog icon](src/icons/check.svg?raw=true)
![cog icon](src/icons/trash.svg?raw=true)
![cog icon](src/icons/bars.svg?raw=true)
![cog icon](src/icons/plus.svg?raw=true)
![cog icon](src/icons/align-objects-center.svg?raw=true)
![cog icon](src/icons/heading.svg?raw=true)
![cog icon](src/icons/columns-two-halfs.svg?raw=true)
![cog icon](src/icons/desktop.svg?raw=true)
![cog icon](src/icons/mobile.svg?raw=true)

# Humbleicons

A set of free MIT-licensed hand-crafted SVG icons for you to use in your web projects.

## Usage

### Fast COPY & PASTE

Just copy the SVG of the icon and paste it into your HTML:

```html
<svg width="1em" height="1em" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="top: .125em; position: relative;">
  <path  stroke-linecap="round" stroke-width="4" d="M6 14l3.293 3.293a1 1 0 001.414 0L19 9"/>
</svg>
```

### PHP library

Install it into your PHP project via Composer:

```
composer require zraly/humbleicons
```

then:

#### In plain PHP

```php
use Humbleicons;

$humbleicons = new Humbleicons;

echo $humbleicons->icon('check'); // renders 'check' icon
```

#### In [Latte](https://latte.nette.org) templates using macro `{icon}` 

```php
use Humbleicons;

$humbleicons = new Humbleicons;

$latte = new Latte\Engine;
$set = new Latte\Macros\MacroSet($latte->getCompiler());
$set->addMacro(
  'icon',
  'echo $humbleicons->icon(%node.word)'
);

$params = [
	'humbleicons' => $humbleicons,
];

$latte->render('template.latte', $params);
```

template:

```latte
{icon check} Success!
```

#### In [Nette](https://nette.org)

macros.php:

```php
namespace App;

use Latte;

final class Macros extends Latte\Macros\MacroSet
{

	public static function install(Latte\Compiler $compiler): void
	{
		$me = new static($compiler);
		$me->addMacro(
			'icon',
			'echo $this->global->humbleicons->icon(%node.word, %node.args)'
		);
	}

}
```

config.neon:

```neon
services:
	nette.latteFactory:
		setup:
			- addProvider('humbleicons', '@Humbleicons\Humbleicons')
	- Humbleicons\Humbleicons
	- App\Macros
latte:
	macros:
		- @App\Macros			
```
template:

```latte
{icon check} Success!
```

## Modificators

You can change the icon appearance with CSS classes. 

First, put this style into your general SCSS styles:

```scss
svg.humbleicons__icon {

	&--big {
		transform: scale(1.3);
	}
	&--flip-horizontal {
		transform: scaleX(-1);
	}
	&--flip-vertical {
		transform: scaleY(-1);
	}

}
```

Then, call the icon with modificators:

```php
echo $humbleicons->icon('check', 'big flip-horizontal'); // renders 'check' icon with modificators
```