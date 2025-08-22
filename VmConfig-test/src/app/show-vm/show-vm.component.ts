import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsoleService } from '../services/console.service';
import RFB from '@novnc/novnc/lib/rfb.js';

@Component({
  selector: 'app-show-vm',
  standalone: false,
  templateUrl: './show-vm.component.html',
  styleUrls: ['./show-vm.component.css']
})
export class ShowVMComponent implements OnInit {
  vms: any[] = [];
  showList = false;
  showAddVmForm = false;
  loadingConsole: Record<string, boolean> = {};
  showConsole: Record<string, boolean> = {};
  scaleViewport = true;
  private rfbByVm: Record<string, any> = {};

  constructor(private httpClient: HttpClient, private consoleSvc: ConsoleService) {}

  ngOnInit(): void {
    this.loadVMs();
  }

  loadVMs() {
    this.showList = true;
    this.getAllVmsData();
  }

  getAllVmsData() {
    const baseURL = "http://localhost:8082/api/vms";
    this.httpClient.get(baseURL).subscribe({
      next: (response: any) => this.vms = response,
      error: error => console.error("Erreur lors de la récupération des VMs :", error)
    });
  }

  deleteVM(vmID: any) {
    const baseURL = "http://localhost:8082/api/vms";
    this.httpClient.delete(`${baseURL}/${vmID}`).subscribe({
      next: () => this.getAllVmsData(),
      error: error => console.error("Erreur lors de la suppression :", error)
    });
  }

  toggleAddVm() {
    this.showAddVmForm = !this.showAddVmForm;
    if (!this.showAddVmForm) this.loadVMs();
  }

  onVmCreated() {
    this.loadVMs();
    this.showAddVmForm = false;
  }

  sanitizeId(value: string): string {
    return (value ?? '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-');
  }

  openConsole(vm: any, node: string = 'pve') {
    const nameKey = vm.name;
    const domId = this.sanitizeId(nameKey);
    this.loadingConsole[nameKey] = true;

    this.consoleSvc.getWssUrlByName(node, vm.name).subscribe({
      next: ({ wssUrl }) => {
        this.showConsole[nameKey] = true;
        setTimeout(() => this.connectNoVnc(nameKey, domId, wssUrl), 0);
      },
      error: (e) => {
        console.error('Erreur ouverture console', e);
        this.loadingConsole[nameKey] = false;
      }
    });
  }

  private connectNoVnc(nameKey: string, domId: string, wssUrl: string) {
    const container = document.getElementById(`vnc-${domId}`) as HTMLDivElement | null;
    if (!container) {
      this.loadingConsole[nameKey] = false;
      return;
    }

    try {
      const rfb = new RFB(container, wssUrl, { repeaterID: '' });
      rfb.viewOnly = false;
      rfb.scaleViewport = this.scaleViewport;

      rfb.addEventListener('connect', () => this.loadingConsole[nameKey] = false);
      rfb.addEventListener('disconnect', (ev: any) => {
        console.error('Console déconnectée', ev?.detail);
        this.showConsole[nameKey] = false;
        this.loadingConsole[nameKey] = false;
        this.rfbByVm[nameKey] = undefined;
      });

      this.rfbByVm[nameKey] = rfb;
    } catch (err) {
      console.error('Erreur noVNC', err);
      this.loadingConsole[nameKey] = false;
      this.showConsole[nameKey] = false;
    }
  }

  toggleScale(vm: any) {
    this.scaleViewport = !this.scaleViewport;
    const key = vm.name;
    const rfb = this.rfbByVm[key];
    if (rfb) rfb.scaleViewport = this.scaleViewport;
  }

  closeConsole(vm: any) {
    const key = vm.name;
    const rfb = this.rfbByVm[key];
    try { rfb?.disconnect(); } catch {}
    this.rfbByVm[key] = undefined;
    this.showConsole[key] = false;
  }
}
