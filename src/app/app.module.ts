import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BuyerProfileComponent } from './buyer-profile/buyer-profile.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { InboxMessagesComponent } from './inbox-messages/inbox-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { AvailableAgentsComponent } from './available-agents/available-agents.component';
import { SearchComponent } from './search/search.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AgentSearchComponent } from './available-agents/agent-search/agent-search.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './profile-setting/change-password/change-password.component';
import { UploadImageComponent } from './profile-setting/upload-image/upload-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from './profile-setting/modal/modal.component';
import { AgentToListPropertyComponent } from './agent-to-list-property/agent-to-list-property.component';
import { AuthService } from './Services/auth.service';
import { LoadingInterceptorService } from './Services/loading-interceptor.service';
import { FAQComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    PropertyListComponent,
    RegisterComponent,
    LoginComponent,
    BuyerProfileComponent,
    AgentDashboardComponent,
    PropertyDetailsComponent,
    AdminPanelComponent,
    EnquiryListComponent,
    FavouriteListComponent,
    InboxMessagesComponent,
    RequestComponent,
    AvailableAgentsComponent,
    SearchComponent,
    AgentSearchComponent,
    SearchHistoryComponent,
    ProfileSettingComponent,
    ChangePasswordComponent,
    UploadImageComponent,
    ModalComponent,
    AgentToListPropertyComponent,
    FAQComponent,
    PrivacyPolicyComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
