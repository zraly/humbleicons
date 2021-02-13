# Humbleicons

A set of free MIT-licensed hand-crafted SVG icons for you to use in your web projects.

### Usage

You can eather copy the SVG of the icon and paste it into your HTML:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-width="4" d="M6 13l3.293 3.293a1 1 0 001.414 0L19 8"/>
</svg>
```

Or you can install it into your PHP project:

```
composer require medhi/humbleicons
```

And use it this way:

```php
use Humbleicons;

$humbleicons = new Humbleicons;

echo $humbleicons->icon('check'); // renders 'check' icon
```

Icons are preconfigured to be stylable by setting the `color` CSS property.