import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showToast(message: string) {
    // Toast ana kapsayıcısı
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3'; // Sağ alt köşe

    // Toast bildirimi
    const toastElement = document.createElement('div');
    toastElement.className = 'toast align-items-center text-bg-primary border-0';
    toastElement.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    
    // Toast'u kapsayıcıya ekleyip gövdeye ekliyoruz
    toastContainer.appendChild(toastElement);
    document.body.appendChild(toastContainer);

    // Bootstrap'in Toast fonksiyonunu kullanarak gösteriyoruz
    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();

    // Toast kapanınca HTML'den kaldırıyoruz
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastContainer.remove();
    });
  }
}
