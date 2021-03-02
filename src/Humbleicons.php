<?php

/**
 * Copyright (c) 2021 Jiří Zralý
 */

declare(strict_types=1);

namespace Humbleicons;

class Humbleicons {

	private const ICON_PATH = '/icons/';
	private const ICON_CLASS_BLOCK = 'humbleicons';
	private const ICON_CLASS_ELEMENT = 'icon';
	private const ICON_CLASS = self::ICON_CLASS_BLOCK . '__' . self::ICON_CLASS_ELEMENT;

	public function __construct()
	{
	}

	public function icon(string $iconName, string $modificators = ''): string
	{
		$iconHTML = @file_get_contents(__DIR__ . self::ICON_PATH . $iconName . '.svg');
		if ($iconHTML === false) {
			return '';
		}

		$modificatorArray = explode(' ', $modificators);
		if (count($modificatorArray) > 0) {
			
			$modificatorArray = array_map(function($value) { 
				return self::ICON_CLASS . '--' . $value; 
			}, $modificatorArray);

			$iconHTML = str_replace(self::ICON_CLASS, self::ICON_CLASS . ' ' . implode(' ', $modificatorArray), $iconHTML);
		}

		return trim($iconHTML);
	}
}