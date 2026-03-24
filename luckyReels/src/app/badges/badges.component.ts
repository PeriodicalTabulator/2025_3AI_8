import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { FirestoreDataService } from '../firestore-data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user';

interface AchievementDef {
  key: string;
  title: string;
  condition: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-badges',
  imports: [CommonModule],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.css'
})
export class BadgesComponent implements OnInit, OnDestroy {

  user: User | null = null;
  private sub: Subscription | null = null;

  achievementsDefs: AchievementDef[] = [
    {
      key: 'slotSpinner',
      title: 'Slot Spinner',
      condition: 'Play 50 slot games.',
      description: 'You’ve spun the reels 50 times! Keep the luck rolling.',
      icon: '🎰'
    },
    {
      key: 'blackjackPro',
      title: 'Blackjack Pro',
      condition: 'Play / win 25 blackjack games.',
      description: 'You’ve mastered the art of 21!',
      icon: '🃏'
    },
    {
      key: 'beanCanCollector',
      title: 'Bean Can Collector',
      condition: 'Play 30 beancan games.',
      description: 'You can’t resist a good toss!',
      icon: '🥫'
    },
    {
      key: 'highRoller',
      title: 'Shut Up and Take My Money',
      condition: 'Add a total of 10,000 coins.',
      description: 'Shut up and take my money!',
      icon: '🤑'
    },
    {
      key: 'dailyPlayer',
      title: 'Daily Player',
      condition: 'Log in 7 days in a row.',
      description: 'Consistency is key! Keep playing daily.',
      icon: '📅'
    },
    {
      key: 'slotMarathon',
      title: 'Slot Marathon',
      condition: 'Play 200 slot games.',
      description: 'Keep it rollin’.',
      icon: '🎡'
    },
    {
      key: 'passiveIncome',
      title: 'Passive income',
      condition: 'Reach 100 coins in your wallet.',
      description: 'Your balance is looking healthy.',
      icon: '💎'
    },
    {
      key: 'tripleThreat',
      title: 'Triple Threat',
      condition: 'Play slots, blackjack and beancan at least 10 times each.',
      description: 'You’ve became addicted.',
      icon: '🎮'
    }
  ];

  constructor(
    private dataService: FirestoreDataService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.sub = this.dataService.userData$.subscribe((users: User[]) => {
      if (users && users.length > 0) {
        this.user = users[0];
        this.checkAndUnlockAchievements();
      } else {
        this.user = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isUnlocked(user: User | null, key: string): boolean {
    if (!user || !user.achievements) return false;
    const ach: any = user.achievements;
    return !!ach[key];
  }

  // AUTO-UNLOCK LOGIKA
  private checkAndUnlockAchievements(): void {
    if (!this.user) return;

    const u = this.user;
    const uid = u.uid;

    const achievements: any = u.achievements || {};
    const updates: Record<string, boolean> = {};
    let changed = false;

  
    if ((u.slotsPlayed || 0) >= 50 && !achievements['slotSpinner']) {
      updates['slotSpinner'] = true;
      changed = true;
    }

   
    const blackjackCount = (u as any).blackjackWins ?? (u.blackJackPlayed || 0);
    if (blackjackCount >= 25 && !achievements['blackjackPro']) {
      updates['blackjackPro'] = true;
      changed = true;
    }

   
    if ((u.beancanPlayed || 0) >= 30 && !achievements['beanCanCollector']) {
      updates['beanCanCollector'] = true;
      changed = true;
    }

   
    if ((u.lifetimeCoins || 0) >= 10000 && !achievements['highRoller']) {
      updates['highRoller'] = true;
      changed = true;
    }

   
    if ((u.loginStreak || 0) >= 7 && !achievements['dailyPlayer']) {
      updates['dailyPlayer'] = true;
      changed = true;
    }

   
    if ((u.slotsPlayed || 0) >= 200 && !achievements['slotMarathon']) {
      updates['slotMarathon'] = true;
      changed = true;
    }

  
    if ((u.wallet || 0) >= 100 && !achievements['passiveIncome']) {
      updates['passiveIncome'] = true;
      changed = true;
    }

  
    const slots = u.slotsPlayed || 0;
    const bj = u.blackJackPlayed || 0;
    const bean = u.beancanPlayed || 0;
    if (slots >= 10 && bj >= 10 && bean >= 10 && !achievements['tripleThreat']) {
      updates['tripleThreat'] = true;
      changed = true;
    }

    if (!changed) return;

    const updateObj: any = {};
    for (const [k, v] of Object.entries(updates)) {
      updateObj[`achievements.${k}`] = v;
    }

    this.firestore.collection('userData').doc(uid).update(updateObj)
      .then(() => {
        this.user = {
          ...u,
          achievements: { ...(u.achievements || {}), ...updates }
        };
      })
      .catch(err => console.error('Failed to update achievements', err));
  }
}
