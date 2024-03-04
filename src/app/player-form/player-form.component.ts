import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  @Input() player: Player = { name: '', touchdownsThrown: '', rushingYards: '', sacks: '', madeFieldGoals: '' };
  @Output() cancelForm = new EventEmitter<void>();

  buttonText = 'Add Player';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  onSubmit(formData: any): void {
    console.log(formData);
    this.playerService.addPlayer({
      name: formData.name,
      touchdownsThrown: formData.touchdownsThrown,
      rushingYards: formData.rushingYards,
      madeFieldGoals: formData.madeFieldGoals,
      sacks: formData.sacks,
    }).subscribe(() => {
      this.playerService.refreshPlayers();
    });
  }
  resetForm() {
    throw new Error('Method not implemented.');
  }

  cancel(): void {
    this.player = { name: '', touchdownsThrown: '', rushingYards: '', sacks: '', madeFieldGoals: '' };
    // this.player = { name: '', touchdownsThrown: '', rushingYards: '' };
    this.buttonText = 'Add Player';
    this.cancelForm.emit();
  }
}
