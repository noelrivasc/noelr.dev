// ==UserScript==
// @name         LinkedIn Feed Replacement
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace LinkedIn feed with custom links
// @match        https://www.linkedin.com/feed*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	// Configuration
	const keySequence = "fff"; // Type this sequence to toggle feed replacement

	const links = [
		["Post Search",
			'https://www.linkedin.com/search/results/content/?keywords=(climate OR conservation) AND (nonprofit OR startup)&sortBy="date_posted"'],
		["Wikipedia",
			"https://www.wikipedia.org"],
	];

	let isReplaced = false;

	function toggleFeedReplacement() {
		const feedElement = document.querySelector('[data-testid="mainFeed"]');
		if (!feedElement) return;

		const overlay = document.getElementById('custom-feed-overlay');

		if (isReplaced && overlay) {
			// Remove overlay and restore feed
			overlay.remove();
			feedElement.style.opacity = '1';
			isReplaced = false;
		} else if (!isReplaced) {
			// Dim the feed
			feedElement.style.opacity = '0.03';

			// Make parent container relative if it exists
			const parent = feedElement.parentElement;
			if (parent && getComputedStyle(parent).position === 'static') {
				parent.style.position = 'relative';
			}

			// Create overlay div
			const newOverlay = document.createElement('div');
			newOverlay.id = 'custom-feed-overlay';
			newOverlay.style.position = 'absolute';
			newOverlay.style.zIndex = 2;
			newOverlay.style.top = '0';
			newOverlay.style.left = '0';
			newOverlay.style.width = '100%';
			newOverlay.style.padding = '20px';
			newOverlay.style.backgroundColor = 'white';
			newOverlay.style.boxSizing = 'border-box';
			newOverlay.style.boxShadow = '0px 5px 20px #bbb';
			newOverlay.style.borderRadius = '5px';

			const ul = document.createElement('ul');
			ul.style.listStyle = 'none';
			ul.style.padding = '0';
			ul.style.margin = '0';

			links.forEach(link => {
				const li = document.createElement('li');
				li.style.marginBottom = '12px';

				const a = document.createElement('a');
				a.href = link[1];
				a.textContent = link[0];
				a.style.fontSize = '16px';

				li.appendChild(a);
				ul.appendChild(li);
			});

			newOverlay.appendChild(ul);
			parent.insertBefore(newOverlay, feedElement);
			isReplaced = true;
		}
	}

	// Create floating button
	const floatingButton = document.createElement('button');
	floatingButton.textContent = '🚀';
	floatingButton.style.position = 'fixed';
	floatingButton.style.top = '20px';
	floatingButton.style.right = '20px';
	floatingButton.style.padding = '12px 16px';
	floatingButton.style.fontSize = '20px';
	floatingButton.style.border = '1px solid #ccc';
	floatingButton.style.borderRadius = '8px';
	floatingButton.style.backgroundColor = 'white';
	floatingButton.style.cursor = 'pointer';
	floatingButton.style.zIndex = '10000';
	floatingButton.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
	floatingButton.title = 'Toggle custom feed';

	floatingButton.addEventListener('click', toggleFeedReplacement);
	document.body.appendChild(floatingButton);

	// Key sequence detection
	let typedSequence = '';
	let sequenceTimer;

	document.addEventListener('keypress', (e) => {
		// Ignore if typing in input fields
		if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
			return;
		}

		clearTimeout(sequenceTimer);
		typedSequence += e.key;

		// Reset sequence after 1 second of no typing
		sequenceTimer = setTimeout(() => {
			typedSequence = '';
		}, 1000);

		// Check if sequence matches
		if (typedSequence.endsWith(keySequence)) {
			toggleFeedReplacement();
			typedSequence = '';
		}
	});
})();
