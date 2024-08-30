import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BuyerProfileComponent } from './buyer-profile/buyer-profile.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './Model/auth.guard';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { InboxMessagesComponent } from './inbox-messages/inbox-messages.component';
import { RequestComponent } from './request/request.component';
import { AvailableAgentsComponent } from './available-agents/available-agents.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { AgentToListPropertyComponent } from './agent-to-list-property/agent-to-list-property.component';
import { FAQComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buyer-profile', component: BuyerProfileComponent},
  {path: 'agent-dashboard', component: AgentDashboardComponent},
  {path: 'properties', component: PropertyListComponent},
  {path: 'propertiesDetails/id', component: PropertyDetailsComponent},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: 'enquiries', component: EnquiryListComponent, canActivate: [AuthGuard]},
  {path: 'favorite', component: FavouriteListComponent},
  {path: 'inbox', component: InboxMessagesComponent},
  {path: 'request', component: RequestComponent},
  {path: 'agents', component: AvailableAgentsComponent},
  {path: 'searchHistory', component: SearchHistoryComponent},
  {path: 'profile-setting', component: ProfileSettingComponent},
  {path: 'AgentToListProperty', component: AgentToListPropertyComponent},
  {path: 'faq', component: FAQComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'privacyPolicy', component: PrivacyPolicyComponent},
  {path: '', redirectTo: '/properties', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
