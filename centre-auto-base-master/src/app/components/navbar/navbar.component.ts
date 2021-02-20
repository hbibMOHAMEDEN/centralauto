import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import { Location } from '@angular/common'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit , OnDestroy {
    private toggleButton: any;
    private sidebarVisible: boolean;

    tokenSub : Subscription;
    isAnonymous : boolean = true;

    constructor(private element: ElementRef,
                private authService : AuthService,
                private location : Location,
                private route : Router) {

        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this.tokenSub= this.authService.getToken()
           .subscribe(
            token => this.isAnonymous = !token
        );
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];

        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    }

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    onClicklogout() {
        this.authService.logout().
        then(()=>{
            this.route.navigate(['']);

        });
    }
    getTypeHeader() {
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1).split('/')[1];
    if(['brands', 'brand','models', 'model','car'].includes(path)){
        return 'bg-dark';
    } return 'navbar-transparent';
    }
    ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
    }


}
