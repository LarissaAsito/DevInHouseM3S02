import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { NOTIFICATIONS_MOCK } from 'src/app/utils/notifications-mock';

import { of } from 'rxjs';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let notificationService = jasmine.createSpyObj(
                            NotificationService, ['getNotifications',
                          'editNotificationApi', 'removeNotification']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: NotificationService, useValue: notificationService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit - Should call carregarNotificacoes method with success', () => {
    spyOn(component, 'carregarNotificacoes');
    component.ngOnInit();
    expect(component.carregarNotificacoes).toHaveBeenCalled();
  });

  it('lerNotificacao - Should call atualizarLista method with success', () =>
  {
    spyOn(component, 'atualizarLista');
    const notificationMock = {aplicativo: '', titulo:'', descricao: '', tempoPublicacao: '',
                            imagem: '', lido: false, id: 1};

    const notificationEditMock = {...notificationMock, lido: true};
    notificationService.editNotificationApi.and.returnValue(of({}));
   
    component.lerNotificacao(notificationMock);
    
    expect(notificationService.editNotificationApi).toHaveBeenCalledOnceWith(notificationEditMock);
    expect(component.atualizarLista).toHaveBeenCalled();
  });

  it('atualizarLista - Should call carregarNotificacoes method with success', () =>{
    spyOn(component, 'carregarNotificacoes');
    component.atualizarLista();

    expect(component.carregarNotificacoes).toHaveBeenCalled();
  });

  xit('carregarNotificacoes - Should return values to listaDeNotificacoes with success', () =>{
    notificationService.getNotifications.and.returnValue(of(NOTIFICATIONS_MOCK));  
  
    component.carregarNotificacoes(); 
    expect(notificationService.getNotifications).toHaveBeenCalled();
    expect(component.listaDeNotificacoes).toEqual(NOTIFICATIONS_MOCK);
  });

  it('removerNotificacao - Should call atualizarLista method with success', () => {
    spyOn(component, 'atualizarLista');
    notificationService.removeNotification.and.returnValue(of({}));

    component.removerNotificacao(1);

    expect(notificationService.removeNotification).toHaveBeenCalled();
    expect(component.atualizarLista).toHaveBeenCalled();
  });

});
