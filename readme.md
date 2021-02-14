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

#### In [Nette](https://nette.org) as a trait

```php
use Latte;

trait Humbleicons
{
	public function injectHumbleicons(\Humbleicons\Humbleicons $humbleicons)
	{
		$template = $this->template;
		$this->onStartup[] = function () use ($template) {
			$latte = $template->getLatte();
			$set = new Latte\Macros\MacroSet($latte->getCompiler());
			$set->addMacro(
				'icon',
				'echo $humbleicons->icon(%node.word)'
			);
		};

		$this->onRender[] = function () use ($humbleicons)  {
			$this->template->humbleicons = $humbleicons;
		};
	}

}
```

presenter:

```php
use App\Traits\Humbleicons;

final class MyPresenter extends Presenter
{
	use Humbleicons;
  ...
}
```
template:

```latte
{icon check} Success!
```

