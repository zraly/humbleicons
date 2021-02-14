<?php

/**
 * Copyright (c) 2021 Jiří Zralý
 */

declare(strict_types=1);

namespace Humbleicons;

class Humbleicons {

	private int $size;

	private const ICON_PATH = '/icons/';

	public function __construct()
	{
		$this->size = 24;
	}

	public function icon(string $iconName): string
	{
		$iconHTML = @file_get_contents(__DIR__ . self::ICON_PATH . $this->size . '/' . $iconName . '.svg');
		if ($iconHTML === false) {
			return '';
		}
		return $iconHTML;
	}
}