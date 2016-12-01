import { Component } from '@angular/core';
import { FiltersService } from './../services/filters.service';

@Component({
	selector: 'filters',
	templateUrl: './app/manager/filters/components/filters.component.html',
	styleUrls: ['./app/manager/filters/components/filters.component.css']
})
export class ManagerFiltersComponent {
	fileTypes : FileTypes[];

	constructor( private filtersService: FiltersService) {}

	ngOnInit(){
		this.fileTypes = this.filtersService.getFileTypes();
	}

	ngAfterViewInit(){
		//audio icon animation
		var audioAnimation = new TimelineMax({repeat: -1});
		var time = 3;

		audioAnimation.appendMultiple([
			TweenMax.to("#notes", time / 2, {opacity: "1"}),
			TweenMax.to("#top_ring", time / 3, {ease: Bounce.easeOut, css:{scale:.9, transformOrigin:'50% 50%'}}).yoyo(true).repeat(3),
			TweenMax.to("#bottom_ring", time / 3, {ease: Bounce.easeOut, css:{scale:.9, transformOrigin:'50% 50%'}}).yoyo(true).repeat(3),
			TweenMax.to("#notes", time, {x: -10, y: -180}),
			TweenMax.to("#note-double", time / 3, {x: 15, y: -20}, "first").yoyo(true).repeat(2),
			TweenMax.to("#note", time / 3, {x: 7, y: 15}, "first").yoyo(true).repeat(2),
			TweenMax.to("#notes", time / 2, {opacity: "0"}).delay(2)
		]);
		audioAnimation.pause(0);

		document.querySelector('.icon-toggler--audio').addEventListener('click', function() {
			if( document.querySelectorAll('.icon-toggler--audio:checked').length ) {
				audioAnimation.play();
			} else {
				audioAnimation.pause(0);
			}
		});

		//image icon animation
		var imageAnimation = new TimelineMax({repeat: -1});
		var flashLines = document.querySelectorAll("#flash path");

		imageAnimation.appendMultiple([
			TweenMax.to("#lens", time, {css:{rotation:360, transformOrigin:'80% 80%'}}),
			TweenMax.fromTo(flashLines, time / 3, {strokeDashoffset: 34, strokeDasharray: 34}, {strokeDashoffset: -34, strokeDasharray: 34}),
			TweenMax.set("#flash", {opacity:1}),
		]);
		imageAnimation.pause(0);

		document.querySelector('.icon-toggler--image').addEventListener('click', function() {
			if( document.querySelectorAll('.icon-toggler--image:checked').length ) {
				imageAnimation.play();
			} else {
				imageAnimation.pause(0);
			}
		});

		//archive icon animation
		var archiveAnimation = new TimelineMax({repeat: -1});

		archiveAnimation.appendMultiple([
			TweenMax.set("#archive-icon path", {scale: .9, transformOrigin:'50% 50%'}),
			TweenMax.to("#archive-icon path", time, {ease: Elastic.easeOut, rotation: -5}),
			TweenMax.to("#archive-icon path", time, {ease: Elastic.easeOut, rotation: 5}).delay(time),

		]);
		archiveAnimation.pause(0);

		document.querySelector('.icon-toggler--archive').addEventListener('click', function() {
			if( document.querySelectorAll('.icon-toggler--archive:checked').length ) {
				archiveAnimation.play();
			} else {
				archiveAnimation.pause(0);
			}
		});

		//video icon animation
		var videoAnimation = new TimelineMax({repeat: -1});

		videoAnimation.appendMultiple([
			TweenMax.set("#video-icon #clip", {transformOrigin: "0% 100%"}),
			TweenMax.fromTo("#video-icon #clip", time / 2, {ease: Bounce.easeOut, rotation: 0}, {ease: Bounce.easeOut, rotation: 13}).yoyo(true).repeat(-1).repeatDelay(1),
		]);

		videoAnimation.pause(0);

		document.querySelector('.icon-toggler--video').addEventListener('click', function() {
			if( document.querySelectorAll('.icon-toggler--video:checked').length ) {
				videoAnimation.play();
			} else {
				videoAnimation.pause(0);
			}
		});

		//text icon animation
		var textAnimation = new TimelineMax({repeat: -1});
		var textLines = document.querySelectorAll('#lines path');

		textAnimation.appendMultiple([
			TweenMax.staggerFromTo(textLines, time, {strokeDashoffset: 435, strokeDasharray: 435}, {strokeDashoffset: -435, strokeDasharray: 435}, time / 4),
		]);

		textAnimation.pause(time);

		document.querySelector('.icon-toggler--text').addEventListener('click', function() {
			if( document.querySelectorAll('.icon-toggler--text:checked').length ) {
				textAnimation.play(time);
			} else {
				textAnimation.pause(time);
			}
		});

		//other icon animation
		var otherAnimation = new TimelineMax({repeat: -1});
		var magicLines = document.querySelectorAll('#magic-lines path');

		otherAnimation.appendMultiple([
			TweenMax.fromTo(magicLines, time / 3, {strokeDashoffset: 0, strokeDasharray: 131}, {strokeDashoffset: 131, strokeDasharray: 131}).yoyo(true).repeat(-1).repeatDelay(1),
		]);

		otherAnimation.pause(0);

		document.querySelector('.icon-toggler--other').addEventListener('click', function() {
			if( document.querySelectorAll('.icon-toggler--other:checked').length ) {
				otherAnimation.play();
			} else {
				otherAnimation.pause(0);
			}
		});
	}
}